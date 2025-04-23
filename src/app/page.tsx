import { FormSecret } from "@/components/core/form";

export default async function Home() {
  return (
    <div className="min-h-screen">
        <div className="max-w-80 mx-auto px-4">
          <FormSecret />
      </div>
    </div>
  );
}
