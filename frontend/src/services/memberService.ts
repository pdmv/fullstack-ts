import axiosInstance from "@/utils/axiosInstance";

export interface IMember {
  _id?: string;
  name: string;
  email: string;
  borrowedBooks?: string[];
}

export const getMembers = async (): Promise<IMember[]> => {
  const response = await axiosInstance.get("/members");
  return response.data as IMember[];
}

export const getMember = async (id: string): Promise<IMember> => {
  const response = await axiosInstance.get(`/members/${id}`);
  return response.data as IMember;
}

export const addMember = async (member: IMember): Promise<IMember> => {
  const response = await axiosInstance.post("/members", member);
  return response.data as IMember;
}

export const updateMember = async (member: IMember): Promise<IMember> => {
  const response = await axiosInstance.put(`/members/${member._id}`, member);
  return response.data as IMember;
}

export const deleteMember = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/members/${id}`);
}