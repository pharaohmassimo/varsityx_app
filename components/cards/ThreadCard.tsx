import { formatDateString, convertLinksToClickable } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import DOMPurify from "dompurify"; // Uncomment if using DOMPurify

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: { name: string; username: string; image: string; id: string };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: { author: { image: string } }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
 
}: Props) => {
  // Extract URL before modifying content
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlMatch = content.match(urlRegex);
  const firstUrl = urlMatch?.[0] || "";

  // Sanitize and convert links (add DOMPurify if needed)
  const processedContent = convertLinksToClickable(
    // DOMPurify.sanitize(content) // Recommended security measure
    content
  );

  return (
    <article className={`flex w-full flex-col ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'} border-b-[0.5px] border-b-dark-1000`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image 
                src={author.image} 
                alt="Profile image" 
                fill 
                className="cursor-pointer rounded-full" 
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semi-bold text-light-1">{author.name}
                        <span className="ml-2 text-subtle-medium text-gray-400">
                          @{author.username}
                        </span>
                        </h4>
                        {/* Check if username exists */}    
                    </Link>

            
            {/* Safe content rendering */}
            <p 
              className="mt-2 text-small-regular text-light-2"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain" />
                <Link href={`/thread/${id}`}>
                  <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain" />
                </Link>
                <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain" />
                <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain" />
              </div>

              <p className="text-subtle-medium text-gray-1">{formatDateString(createdAt)}</p>

              {comments.length > 0 && (
                <Link href={`/thread/${id}`} className="mt-1 text-subtle-medium text-blue">
                  {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} 
            - {community.name} Community
          </p>
          <Image 
            src={community.image} 
            alt={community.name} 
            width={14} 
            height={14} 
            className="ml-1 rounded-full object-cover" 
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;