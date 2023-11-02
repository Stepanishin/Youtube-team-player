import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import { UsersIcon } from "@/assets/svg/svg";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";
import { User } from "@/utils/types/user.type";
import React, { FC } from "react";

interface UsersProps {
  usersList: User[];
  userCount: number;
}

const Users: FC<UsersProps> = ({ usersList, userCount }) => {
  return (
    <div className="p-6 md:p-8 flex gap-2 flex-col">
      <div className="flex gap-2 items-center">
        <UsersIcon hover={false} />
        <Paragraph type={ParagraphTypeEnum.p1_Small}>{userCount}</Paragraph>
      </div>
      <ul>
        {usersList.map((user, index) => {
          return (
            <li key={index}>
              <Paragraph type={ParagraphTypeEnum.p1_Small}>
                - {user.name}
              </Paragraph>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
