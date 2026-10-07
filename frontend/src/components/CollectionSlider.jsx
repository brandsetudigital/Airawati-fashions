import React, { useState, useEffect, useRef, useCallback } from 'react';

const COLLECTION_ITEMS = [
  {
    id: 1,
    image: '/images/shop_collection_1.jpg',
    alt: 'Bridal Handwoven Saree',
    name: 'Bridal Heritage',
  },
  {
    id: 2,
    image: '/images/shop_collection_2.jpg',
    alt: 'Peacock Green & Purple Silk Saree',
    name: 'Peacock Zari Silk',
  },
  {
    id: 3,
    image: '/images/shop_collection_3.jpg',
    alt: 'Banarasi Brocade Silk Saree',
    name: 'Brocade Masterpiece',
  },
  {
    id: 4,
    image: '/images/shop_collection_4.jpg',
    alt: 'Royal Heritage Magenta & Blue Saree',
    name: 'Royal Magenta Heirloom',
  },
  {
    id: 5,
    image: '/images/shop_collection_5.jpg',
    alt: 'Traditional Purple & Pink Saree',
    name: 'Temple Border Silk',
  },
  {
    id: 6,
    image: '/images/shop_collection_6.jpg',
    alt: 'Classic Red, Yellow & Green Saree',
    name: 'Festive Tri-Color',
  },
  {
    id: 7,
    image: '/images/shop_collection_7.jpg',
    alt: 'Royal Heritage Staircase Sarees',
    name: 'Palace Corridor Silk',
  },
];

// Tripled to 21 items for seamless infinite looping
const EXTENDED_ITEMS = [
  ...COLLECTION_ITEMS.map((item, idx) => ({ ...item, uniqueKey: `set1-${idx}` })),
  ...COLLECTION_ITEMS.map((item, idx) => ({ ...item, uniqueKey: `set2-${idx}` })),
  ...COLLECTION_ITEMS.map((item, idx) => ({ ...item, uniqueKey: `set3-${idx}` })),
];

export default function CollectionSlider() {
  // Start at index 10 (card id 4 in set 2) matching Figma center
  const [currentIndex, setCurrentIndex] = useState(10);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [containerWidth, setContainerWidth] = useState(1000);

  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const resetTimerRef = useRef(null);

  // Measure container safely with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      setContainerWidth(el.offsetWidth || window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(el);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Compute responsive card width and step safely
  const getLayoutDimensions = () => {
    if (containerWidth < 480) {
      return { cardWidth: 84, gap: 8 };
    } else if (containerWidth < 640) {
      return { cardWidth: 104, gap: 10 };
    } else if (containerWidth < 768) {
      return { cardWidth: 124, gap: 12 };
    } else if (containerWidth < 1024) {
      return { cardWidth: 138, gap: 14 };
    } else {
      return { cardWidth: 152, gap: 16 };
    }
  };

  const { cardWidth, gap } = getLayoutDimensions();
  const step = cardWidth + gap;
  // Center of card `currentIndex` aligned with center of container
  const translateX = Math.round(containerWidth / 2 - (currentIndex * step + cardWidth / 2));

  // Next slide function with safe infinite wrap
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= 16) {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex((curr) => curr - 7);
        }, 720);
      }
      return next;
    });
  }, []);

  // Prev slide function with safe infinite wrap
  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next <= 4) {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex((curr) => curr + 7);
        }, 720);
      }
      return next;
    });
  }, []);

  // Restore transition after instantaneous snap
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // AUTOMATIC SLIDING: Runs continuously every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Clean up any pending reset timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCardClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-4 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 sm:py-6 flex items-center"
        style={{ minHeight: '430px' }}
      >
        {/* Sliding Track */}
        <div
          className="flex items-center"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning
              ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
              : 'none',
          }}
        >
          {EXTENDED_ITEMS.map((item, index) => {
            const distance = Math.abs(index - currentIndex);

            // Progressive height and scaling matching the Figma arch silhouette
            let heightClass = 'h-[140px] xs:h-[165px] sm:h-[195px] md:h-[225px] lg:h-[245px]';
            let visualClass = 'scale-[0.75] opacity-50 z-5 shadow-xs border border-[#C5A059]/20';

            if (distance === 0) {
              // Active Center Card (Tallest & Prominent)
              heightClass = 'h-[250px] xs:h-[295px] sm:h-[345px] md:h-[390px] lg:h-[420px]';
              visualClass = 'scale-105 opacity-100 z-30 shadow-2xl ring-2 ring-[#C5A059] border-2 border-[#C5A059]';
            } else if (distance === 1) {
              // 1 step away from center
              heightClass = 'h-[220px] xs:h-[260px] sm:h-[305px] md:h-[345px] lg:h-[370px]';
              visualClass = 'scale-[0.98] opacity-90 z-20 shadow-lg border border-[#C5A059]/40';
            } else if (distance === 2) {
              // 2 steps away from center
              heightClass = 'h-[190px] xs:h-[225px] sm:h-[265px] md:h-[300px] lg:h-[320px]';
              visualClass = 'scale-[0.90] opacity-80 z-15 shadow-md border border-[#C5A059]/30';
            } else if (distance === 3) {
              // 3 steps away from center (outermost visible in arch)
              heightClass = 'h-[160px] xs:h-[190px] sm:h-[225px] md:h-[255px] lg:h-[275px]';
              visualClass = 'scale-[0.82] opacity-60 z-10 shadow-sm border border-[#C5A059]/25';
            } else {
              // Outside visible arch window
              visualClass = 'scale-[0.65] opacity-0 pointer-events-none z-0';
            }

            return (
              <div
                key={item.uniqueKey}
                onClick={() => handleCardClick(index)}
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${gap}px`,
                }}
                className={`relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-out ${heightClass} ${visualClass} group`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    distance === 0
                      ? 'bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70'
                      : 'bg-black/15 group-hover:bg-transparent'
                  }`}
                />

                {/* Active Card Label */}
                {distance === 0 && (
                  <div className="absolute bottom-2 sm:bottom-3 inset-x-2 text-center pointer-events-none transition-opacity duration-500">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[#FAF7F2] text-[9px] sm:text-[11px] font-serif tracking-wider border border-[#C5A059]/50 shadow-md">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 Slide Dots / Indicators */}
      <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
        {COLLECTION_ITEMS.map((item, dotIdx) => {
          const isActive = (currentIndex % 7) === dotIdx;
          return (
            <button
              key={dotIdx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(7 + dotIdx);
              }}
              title={item.name}
              aria-label={`Go to slide ${dotIdx + 1}: ${item.name}`}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                isActive
                  ? 'w-7 sm:w-8 h-2 bg-gradient-to-r from-[#6E1C24] via-[#8C1D35] to-[#B83227] shadow-sm'
                  : 'w-2 h-2 bg-[#C5A059]/35 hover:bg-[#C5A059] hover:scale-125'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
