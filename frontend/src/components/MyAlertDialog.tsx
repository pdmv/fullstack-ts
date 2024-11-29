import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

export interface MyAlertDialogProps {
  isOpen?: boolean;
  title: string;
  description: string;
  cancelText?: string;
  actionText?: string;
  onCancel?: () => void;
  onAction: () => Promise<void>;
}

const MyAlertDialog = (props: MyAlertDialogProps) => {
  return (
    <AlertDialog open={props.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={props.onCancel ? props.onCancel : () => {}}
          >
            {props.cancelText ? props.cancelText : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await props.onAction();
            }}
          >
            {props.actionText ? props.actionText : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MyAlertDialog;
