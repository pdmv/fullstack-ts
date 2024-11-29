import axiosInstance from "@/utils/axiosInstance";
import { IMember } from "./memberService";

type LoanServiceProps = {
  memberId: string;
  bookId: string;
};

export interface ILoanServiceReturnObj {
  member: IMember;
}

export const borrowBook = async (props: LoanServiceProps): Promise<void> => {
  const response = await axiosInstance.post(
    `/members/borrow/${props.memberId}`,
    {
      bookId: props.bookId,
    }
  );
  console.log(response.data);
};

export const returnBook = async (props: LoanServiceProps): Promise<void> => {
  const response = await axiosInstance.post(
    `/members/return/${props.memberId}`,
    {
      bookId: props.bookId,
    }
  );
  console.log(response.data);
};