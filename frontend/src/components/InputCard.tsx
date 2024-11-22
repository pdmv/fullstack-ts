import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputCardInputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export type InputCardProps = {
  title: string;
  description: string;
  onSubmit: () => void;
  isEnable?: boolean;
  inputs: InputCardInputProps[];
  primaryButton?: string;
  secondaryButton?: string;
  secondaryButtonOnClick?: () => void;
};

const InputCard = (props: InputCardProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {props.inputs.map((input) => (
              <div key={input.id} className="flex flex-col space-y-1.5">
                <Label htmlFor={input.id}>{input.label}</Label>
                <Input
                  id={input.id}
                  type={input.type || "text"}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={(e) =>
                    input.onChange && input.onChange(e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className={props.secondaryButton ? "flex justify-between" : "flex justify-end"}>
        {props.secondaryButton && (
          <Button variant="outline" onClick={props.secondaryButtonOnClick}>
            {props.secondaryButton}
          </Button>
        )}
        <Button onClick={props.onSubmit} disabled={props.isEnable}>
          {props.primaryButton}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InputCard;