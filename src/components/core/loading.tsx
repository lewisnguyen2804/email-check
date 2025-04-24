import { Spinner } from "../ui/spinner";

export default function Loading({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center h-[120px]">
      <Spinner />
      <div className="h-3" />
      <span className="text-gray-600">{text}</span>
    </div>
  );
}
