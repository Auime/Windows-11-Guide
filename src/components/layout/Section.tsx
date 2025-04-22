import React, { ReactNode, forwardRef } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

const Section = forwardRef<HTMLDivElement, ISectionProps>((props, ref) => (
  <div
    id={props.id}
    ref={ref}
    className={`mx-auto max-w-screen-lg px-3 ${
      props.yPadding ? props.yPadding : 'py-16'
    } ${props.className || ''}`}
  >
    {(props.title || props.description) && (
      <div className="mb-12 text-center">
        {props.title && (
          <h2 className="text-4xl font-bold text-gray-900">{props.title}</h2>
        )}
        {props.description && (
          <div className="mt-4 text-xl md:px-20">{props.description}</div>
        )}
      </div>
    )}

    {props.children}
  </div>
));

Section.displayName = 'Section';

export { Section };
