import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import Form from "@/components/Form";

const DotPatternDemo2 = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-20 md:shadow-xl">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn("[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] bg-gray-950")}
      />
      <Form />
    </div>
  );
};

export default DotPatternDemo2;
