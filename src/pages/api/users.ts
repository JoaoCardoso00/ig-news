import { NextApiResponse, NextApiRequest } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    { id: 1, name: "Diego" },
    { id: 2, name: "Dani" },
    { id: 3, name: "Rafa" },
  ];
  return res.json(users);
};
