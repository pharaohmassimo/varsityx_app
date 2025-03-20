import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: {id: string }}) => {
    if(!params.id) return <div>Invalid thread ID</div>;

    const user = await currentUser();
    if(!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

        const thread = await fetchThreadById(params.id);
    
    if(!thread) return <div>Thread not found</div>

    return (
        <section className="relative">
            <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id ?? ""} // Add fallback for undefined
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                    />
            </div>

            <div className="mt-7">
                <Comment 
                    threadId={thread.id}
                    currentUserImg={userInfo.Image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10 comment-spacing">
                {thread.children.map((childItem: any) => (
                    <ThreadCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id ?? ""} // Add fallback for undefined
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                        /> 
                ))}
            </div>

        </section>
    )
}

export default Page;