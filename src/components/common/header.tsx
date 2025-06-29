import React, { ReactNode } from "react";

interface ISectionHeader {
  children: ReactNode;
  acronym?: string;
}
const SectionHeader = ({ children, acronym }: ISectionHeader) => {
  return (
    <div className="text-center mb-12">
      <div className="text-[#3ec76e] font-medium mb-2">{acronym}</div>
      {children}
    </div>
  );
};

interface ISectionHeaderTitle {
  children: ReactNode;
}
SectionHeader.Title = function SectionHeaderTitle({
  children,
}: ISectionHeaderTitle) {
  return <h1 className="text-4xl font-bold text-gray-900 mb-4">{children}</h1>;
};

interface ISectionHeaderSubtitle {
  children: ReactNode;
}
SectionHeader.Subtitle = function SectionHeaderSubtitle({
  children,
}: ISectionHeaderSubtitle) {
  return <p className="text-gray-600 max-w-2xl mx-auto">{children}</p>;
};

export default SectionHeader;
