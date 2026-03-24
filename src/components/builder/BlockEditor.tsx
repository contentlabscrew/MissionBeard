"use client";

import React from "react";
import { Block, BlockType } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface BlockEditorProps {
  block: Block | null;
  onUpdate: (block: Block) => void;
  onDelete: (blockId: string) => void;
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

function updateProp(block: Block, key: string, value: unknown): Block {
  return { ...block, props: { ...block.props, [key]: value } };
}

function HeaderEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"header">["props"];
  return (
    <>
      <FieldGroup label="Logo URL">
        <Input value={props.logoUrl} onChange={(e) => onUpdate(updateProp(block, "logoUrl", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
    </>
  );
}

function HeroEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"hero">["props"];
  return (
    <>
      <FieldGroup label="Image URL">
        <Input value={props.imageUrl} onChange={(e) => onUpdate(updateProp(block, "imageUrl", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Headline">
        <Input value={props.headline} onChange={(e) => onUpdate(updateProp(block, "headline", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Subheadline">
        <Textarea value={props.subheadline} onChange={(e) => onUpdate(updateProp(block, "subheadline", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="CTA Text">
        <Input value={props.ctaText} onChange={(e) => onUpdate(updateProp(block, "ctaText", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="CTA URL">
        <Input value={props.ctaUrl} onChange={(e) => onUpdate(updateProp(block, "ctaUrl", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
      <FieldGroup label="Text Color">
        <div className="flex gap-2">
          <input type="color" value={props.textColor} onChange={(e) => onUpdate(updateProp(block, "textColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.textColor} onChange={(e) => onUpdate(updateProp(block, "textColor", e.target.value))} />
        </div>
      </FieldGroup>
    </>
  );
}

function ProductEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"product">["props"];
  return (
    <>
      <FieldGroup label="Product Name">
        <Input value={props.name} onChange={(e) => onUpdate(updateProp(block, "name", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Description">
        <Textarea value={props.description} onChange={(e) => onUpdate(updateProp(block, "description", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Price">
        <Input value={props.price} onChange={(e) => onUpdate(updateProp(block, "price", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Image URL">
        <Input value={props.imageUrl} onChange={(e) => onUpdate(updateProp(block, "imageUrl", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="CTA Text">
        <Input value={props.ctaText} onChange={(e) => onUpdate(updateProp(block, "ctaText", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="CTA URL">
        <Input value={props.ctaUrl} onChange={(e) => onUpdate(updateProp(block, "ctaUrl", e.target.value))} />
      </FieldGroup>
    </>
  );
}

function TextEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"text">["props"];
  return (
    <>
      <FieldGroup label="Content">
        <Textarea value={props.content} rows={4} onChange={(e) => onUpdate(updateProp(block, "content", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Font Size">
        <Input type="number" value={props.fontSize} onChange={(e) => onUpdate(updateProp(block, "fontSize", parseInt(e.target.value) || 16))} />
      </FieldGroup>
      <FieldGroup label="Text Align">
        <select
          value={props.textAlign}
          onChange={(e) => onUpdate(updateProp(block, "textAlign", e.target.value))}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FieldGroup>
      <FieldGroup label="Text Color">
        <div className="flex gap-2">
          <input type="color" value={props.color} onChange={(e) => onUpdate(updateProp(block, "color", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.color} onChange={(e) => onUpdate(updateProp(block, "color", e.target.value))} />
        </div>
      </FieldGroup>
      <FieldGroup label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
    </>
  );
}

function CTAButtonEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"ctaButton">["props"];
  return (
    <>
      <FieldGroup label="Button Text">
        <Input value={props.text} onChange={(e) => onUpdate(updateProp(block, "text", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="URL">
        <Input value={props.url} onChange={(e) => onUpdate(updateProp(block, "url", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Button Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
      <FieldGroup label="Text Color">
        <div className="flex gap-2">
          <input type="color" value={props.textColor} onChange={(e) => onUpdate(updateProp(block, "textColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.textColor} onChange={(e) => onUpdate(updateProp(block, "textColor", e.target.value))} />
        </div>
      </FieldGroup>
      <FieldGroup label="Alignment">
        <select
          value={props.align}
          onChange={(e) => onUpdate(updateProp(block, "align", e.target.value))}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FieldGroup>
    </>
  );
}

function DividerEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"divider">["props"];
  return (
    <>
      <FieldGroup label="Color">
        <div className="flex gap-2">
          <input type="color" value={props.color} onChange={(e) => onUpdate(updateProp(block, "color", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.color} onChange={(e) => onUpdate(updateProp(block, "color", e.target.value))} />
        </div>
      </FieldGroup>
      <FieldGroup label="Spacing (px)">
        <Input type="number" value={props.spacing} onChange={(e) => onUpdate(updateProp(block, "spacing", parseInt(e.target.value) || 20))} />
      </FieldGroup>
    </>
  );
}

function ImageEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"image">["props"];
  return (
    <>
      <FieldGroup label="Image URL">
        <Input value={props.src} onChange={(e) => onUpdate(updateProp(block, "src", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Alt Text">
        <Input value={props.alt} onChange={(e) => onUpdate(updateProp(block, "alt", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Link URL (optional)">
        <Input value={props.url} onChange={(e) => onUpdate(updateProp(block, "url", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Width">
        <Input value={props.width} onChange={(e) => onUpdate(updateProp(block, "width", e.target.value))} />
      </FieldGroup>
    </>
  );
}

function DiscountEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"discount">["props"];
  return (
    <>
      <FieldGroup label="Discount Code">
        <Input value={props.code} onChange={(e) => onUpdate(updateProp(block, "code", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Description">
        <Input value={props.description} onChange={(e) => onUpdate(updateProp(block, "description", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
    </>
  );
}

function FooterEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"footer">["props"];
  return (
    <>
      <FieldGroup label="Company Name">
        <Input value={props.companyName} onChange={(e) => onUpdate(updateProp(block, "companyName", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Address">
        <Input value={props.address} onChange={(e) => onUpdate(updateProp(block, "address", e.target.value))} />
      </FieldGroup>
      <FieldGroup label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} className="w-10 h-10 rounded border cursor-pointer" />
          <Input value={props.backgroundColor} onChange={(e) => onUpdate(updateProp(block, "backgroundColor", e.target.value))} />
        </div>
      </FieldGroup>
    </>
  );
}

function ProductGridEditor({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  const props = block.props as Block<"productGrid">["props"];
  return (
    <>
      <FieldGroup label="CTA Text">
        <Input value={props.ctaText} onChange={(e) => onUpdate(updateProp(block, "ctaText", e.target.value))} />
      </FieldGroup>
      {props.products.map((product, i) => (
        <div key={i} className="border rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-gray-500">Product {i + 1}</p>
          <FieldGroup label="Name">
            <Input value={product.name} onChange={(e) => {
              const products = [...props.products];
              products[i] = { ...products[i], name: e.target.value };
              onUpdate(updateProp(block, "products", products));
            }} />
          </FieldGroup>
          <FieldGroup label="Price">
            <Input value={product.price} onChange={(e) => {
              const products = [...props.products];
              products[i] = { ...products[i], price: e.target.value };
              onUpdate(updateProp(block, "products", products));
            }} />
          </FieldGroup>
          <FieldGroup label="Image URL">
            <Input value={product.imageUrl} onChange={(e) => {
              const products = [...props.products];
              products[i] = { ...products[i], imageUrl: e.target.value };
              onUpdate(updateProp(block, "products", products));
            }} />
          </FieldGroup>
          <FieldGroup label="Link URL">
            <Input value={product.ctaUrl} onChange={(e) => {
              const products = [...props.products];
              products[i] = { ...products[i], ctaUrl: e.target.value };
              onUpdate(updateProp(block, "products", products));
            }} />
          </FieldGroup>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const products = [...props.products, {
            imageUrl: "https://via.placeholder.com/260x260/F5F5F5/01070E?text=New+Product",
            imageAlt: "Product",
            name: "New Product",
            price: "£0.00",
            ctaUrl: "https://missionbeard.com",
          }];
          onUpdate(updateProp(block, "products", products));
        }}
      >
        + Add Product
      </Button>
    </>
  );
}

const editors: Record<BlockType, React.ComponentType<{ block: Block; onUpdate: (b: Block) => void }>> = {
  header: HeaderEditor,
  hero: HeroEditor,
  product: ProductEditor,
  productGrid: ProductGridEditor,
  text: TextEditor,
  ctaButton: CTAButtonEditor,
  divider: DividerEditor,
  image: ImageEditor,
  discount: DiscountEditor,
  footer: FooterEditor,
};

export function BlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  if (!block) {
    return (
      <div className="w-72 border-l border-gray-200 bg-white p-4 flex items-center justify-center">
        <p className="text-sm text-gray-400 text-center">
          Select a block to edit its properties
        </p>
      </div>
    );
  }

  const Editor = editors[block.type];

  return (
    <div className="w-72 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Edit Block
          </h2>
          <Button variant="ghost" size="icon" onClick={() => onDelete(block.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
        <Editor block={block} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
