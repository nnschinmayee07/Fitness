import React, { Children, isValidElement } from 'react';

const StickyTabItem = () => null;

const StickyTabs = React.forwardRef(({
  children,
  mainNavHeight = '6em',
  rootClassName = 'bg-[#0F0F0F] text-white',
  navSpacerClassName = 'border-b border-white/10 bg-[#0F0F0F]',
  sectionClassName = 'bg-[#1A1A1A]',
  stickyHeaderContainerClassName = 'shadow-lg',
  headerContentWrapperClassName = 'border-b border-t border-white/10 bg-[#0F0F0F]',
  headerContentLayoutClassName = 'mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8',
  titleClassName = 'my-0 text-2xl font-display font-bold leading-none md:text-3xl lg:text-4xl text-[#F5F5F5]',
  contentLayoutClassName = 'mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8',
}, ref) => {
  const stickyTopValue = `calc(${mainNavHeight} - 1px)`;
  const navHeightStyle = { height: mainNavHeight };
  const stickyHeaderStyle = { top: stickyTopValue };

  return (
    <div className={`overflow-clip ${rootClassName}`} ref={ref}>
      <div
        className={`sticky left-0 top-0 z-20 w-full ${navSpacerClassName}`}
        style={navHeightStyle}
        aria-hidden="true"
      />

      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          if (process.env.NODE_ENV === 'development' && child != null) {
            console.warn('StickyTabs component expects <StickyTabs.Item> components as direct children.');
          }
          return null;
        }

        const { title, id, children: itemContent } = child.props;

        return (
          <section
            key={id}
            className={`relative overflow-clip ${sectionClassName}`}
          >
            <div
              className={`sticky z-10 -mt-px flex flex-col ${stickyHeaderContainerClassName}`}
              style={stickyHeaderStyle}
            >
              <div className={headerContentWrapperClassName}>
                <div className={headerContentLayoutClassName}>
                  <div className="flex items-center justify-between">
                    <h2 className={titleClassName}>
                      {title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className={contentLayoutClassName}>
              {itemContent}
            </div>
          </section>
        );
      })}
    </div>
  );
});

StickyTabs.displayName = 'StickyTabs';
StickyTabs.Item = StickyTabItem;

export default StickyTabs;
