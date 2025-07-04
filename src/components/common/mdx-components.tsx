import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export const components: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold tracking-tight mb-4 mt-8" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-3xl font-semibold tracking-tight mb-3 mt-6"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-2xl font-medium tracking-tight mb-2 mt-5" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="text-xl font-medium tracking-tight mb-2 mt-4" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base leading-7 mb-4" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 mb-4" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-4" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="mb-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-4 pl-4 italic text-gray-600" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-gray-100 text-sm px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-gray-900 text-white p-4 rounded mb-4 overflow-x-auto text-sm"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img className="rounded-lg my-4" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-6 border-gray-300" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <table className="table-auto border-collapse w-full my-4" {...props} />
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-gray-100 text-left" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => <tbody {...props} />,
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="border-b" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="px-4 py-2 font-semibold" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-2" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
  del: (props: ComponentPropsWithoutRef<"del">) => (
    <del className="line-through text-gray-500" {...props} />
  ),
};
