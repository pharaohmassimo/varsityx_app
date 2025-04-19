import Image from "next/image";

interface UserPreviewProps {
  name: string;
  username: string;
  image: string;
  bio?: string;
}

const UserPreview = ({ name, username, image, bio }: UserPreviewProps) => (
  <div className="z-50 w-64 rounded-xl bg-dark-3 p-4 shadow-xl transition-all">
    <div className="flex items-center gap-3">
      <Image src={image} alt={name} width={48} height={48} className="rounded-full object-cover" />
      <div>
        <p className="text-base font-semibold text-light-1">{name}</p>
        <p className="text-sm text-gray-400">@{username}</p>
      </div>
    </div>
    {bio && <p className="mt-2 text-sm text-light-2">{bio}</p>}
  </div>
);

export default UserPreview;
