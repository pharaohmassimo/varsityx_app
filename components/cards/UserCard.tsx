"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">

        <Image
          src={imgUrl}
          alt="User avatar"
          width={54}
          height={54}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn group flex items-center gap-2 relative overflow-hidden"
        onClick={() => router.push(`/profile/${id}`)}
      >
        <span className="group-hover:translate-y-6 transition-transform duration-900 ease-in-out">
          View
        </span>
        <EyeIcon className="w-5 h-5 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out"/>
      </Button>
    </article>
  );
};

export default UserCard;
