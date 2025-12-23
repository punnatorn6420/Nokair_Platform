export type TailwindClassName = string

export type SchemaNodeProps = Record<string, unknown>

export type SchemaNode<
  TType extends string = string,
  TProps extends SchemaNodeProps = SchemaNodeProps,
> = {
  id: string
  type: TType
  props?: TProps
  className?: TailwindClassName
  children?: SchemaNode[]
}

export type ShadcnButtonProps = {
  label?: string
  href?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export type ShadcnCardProps = {
  title?: string
  description?: string
  mediaUrl?: string
  layout?: "vertical" | "horizontal" | "media-left" | "media-right"
}

export type SectionProps = {
  background?: TailwindClassName
  padding?: string
  align?: "start" | "center" | "end"
}

export type StackProps = {
  direction?: "row" | "column"
  gap?: string
  align?: "start" | "center" | "end"
  justify?: "start" | "center" | "between" | "around" | "end"
}

export type ButtonNode = SchemaNode<"button", ShadcnButtonProps>
export type CardNode = SchemaNode<"card", ShadcnCardProps>
export type SectionNode = SchemaNode<"section", SectionProps>
export type StackNode = SchemaNode<"stack", StackProps>

export type Node =
  | ButtonNode
  | CardNode
  | SectionNode
  | StackNode
  | SchemaNode

export type PageSchema = {
  route: string
  background?: TailwindClassName
  children: Node[]
}
