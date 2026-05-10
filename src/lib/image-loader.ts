export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
