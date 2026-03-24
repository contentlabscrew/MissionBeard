"use client";

import React from "react";
import { Block, BlockType } from "@/types";

function HeaderPreview({ props }: { props: Block<"header">["props"] }) {
  return (
    <div style={{ backgroundColor: props.backgroundColor, padding: "16px 20px" }} className="flex items-center justify-between">
      <img src={props.logoUrl} alt={props.logoAlt} className="h-8 object-contain" />
      <div className="flex gap-4">
        {props.links.map((link, i) => (
          <span key={i} className="text-xs text-gray-300 hover:text-white">{link.text}</span>
        ))}
      </div>
    </div>
  );
}

function HeroPreview({ props }: { props: Block<"hero">["props"] }) {
  return (
    <div style={{ backgroundColor: props.backgroundColor }}>
      <img src={props.imageUrl} alt={props.imageAlt} className="w-full h-40 object-cover" />
      <div className="p-6 text-center">
        <h1 style={{ color: props.textColor }} className="text-2xl font-bold mb-2">{props.headline}</h1>
        <p style={{ color: props.textColor }} className="text-sm opacity-80 mb-4">{props.subheadline}</p>
        <span className="inline-block bg-[#E98517] text-white px-6 py-2 rounded text-sm font-semibold">
          {props.ctaText}
        </span>
      </div>
    </div>
  );
}

function ProductPreview({ props }: { props: Block<"product">["props"] }) {
  return (
    <div className="p-4 flex gap-4 bg-white">
      <img src={props.imageUrl} alt={props.imageAlt} className="w-32 h-32 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-bold text-sm">{props.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{props.description}</p>
        <p className="font-bold text-sm mt-2">{props.price}</p>
        <span className="inline-block bg-[#E98517] text-white px-4 py-1 rounded text-xs font-semibold mt-2">
          {props.ctaText}
        </span>
      </div>
    </div>
  );
}

function ProductGridPreview({ props }: { props: Block<"productGrid">["props"] }) {
  return (
    <div className="p-4 grid grid-cols-2 gap-4" style={{ backgroundColor: props.backgroundColor }}>
      {props.products.map((product, i) => (
        <div key={i} className="text-center">
          <img src={product.imageUrl} alt={product.imageAlt} className="w-full h-28 object-cover rounded mb-2" />
          <p className="text-sm font-semibold">{product.name}</p>
          <p className="text-xs text-gray-500">{product.price}</p>
          <span className="inline-block bg-[#E98517] text-white px-3 py-1 rounded text-xs mt-1">
            {props.ctaText}
          </span>
        </div>
      ))}
    </div>
  );
}

function TextPreview({ props }: { props: Block<"text">["props"] }) {
  return (
    <div style={{ backgroundColor: props.backgroundColor, padding: "16px 20px", color: props.color, fontSize: props.fontSize, textAlign: props.textAlign }}>
      {props.content}
    </div>
  );
}

function CTAButtonPreview({ props }: { props: Block<"ctaButton">["props"] }) {
  return (
    <div style={{ padding: "16px 20px", textAlign: props.align }}>
      <span
        style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
        className="inline-block px-8 py-3 rounded font-semibold text-sm"
      >
        {props.text}
      </span>
    </div>
  );
}

function DividerPreview({ props }: { props: Block<"divider">["props"] }) {
  return (
    <div style={{ padding: `${props.spacing}px 20px` }}>
      <hr style={{ borderColor: props.color, borderTopWidth: 1 }} />
    </div>
  );
}

function ImagePreview({ props }: { props: Block<"image">["props"] }) {
  return (
    <div className="p-0">
      <img src={props.src} alt={props.alt} style={{ width: props.width }} className="block mx-auto" />
    </div>
  );
}

function DiscountPreview({ props }: { props: Block<"discount">["props"] }) {
  return (
    <div style={{ backgroundColor: props.backgroundColor, color: props.textColor }} className="p-6 text-center">
      <p className="text-sm mb-1">{props.description}</p>
      <div
        style={{ backgroundColor: props.accentColor, color: props.textColor }}
        className="inline-block px-6 py-2 rounded text-lg font-bold tracking-wider mt-1"
      >
        {props.code}
      </div>
    </div>
  );
}

function FooterPreview({ props }: { props: Block<"footer">["props"] }) {
  return (
    <div style={{ backgroundColor: props.backgroundColor, color: props.textColor }} className="p-6 text-center text-xs">
      <div className="flex justify-center gap-4 mb-3">
        {props.socialLinks.map((link, i) => (
          <span key={i} className="underline">{link.platform}</span>
        ))}
      </div>
      <p>{props.companyName}</p>
      <p className="mt-1 opacity-60">{props.address}</p>
      <p className="mt-2 underline opacity-60">Unsubscribe</p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const previewComponents: Record<BlockType, React.ComponentType<{ props: any }>> = {
  header: HeaderPreview,
  hero: HeroPreview,
  product: ProductPreview,
  productGrid: ProductGridPreview,
  text: TextPreview,
  ctaButton: CTAButtonPreview,
  divider: DividerPreview,
  image: ImagePreview,
  discount: DiscountPreview,
  footer: FooterPreview,
};

export function BlockPreview({ block }: { block: Block }) {
  const Preview = previewComponents[block.type];
  if (!Preview) return <div className="p-4 text-red-500">Unknown block: {block.type}</div>;
  return <Preview props={block.props} />;
}
