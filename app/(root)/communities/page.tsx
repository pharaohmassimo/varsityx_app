
import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
 
import { profileTabs } from "@/constants";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";


async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await  fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');


    //fetch communities
    const result = await  fetchCommunities({
        searchString: "",
        pageNumber: 1,
        pageSize: 25
    })

  return (
    <section>
        <h1 className="head-text mb-10">

        </h1>

        <div className=" mt-14 flex flex-col gap-9">
          {result.communities.length === 0 ? (
            <p className="no-result"> No Communities</p>
          ) : (
            <>
              {result.communities.map((community) => (
                <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
                />
              ))}
            </>
          )}
        </div>
    </section>
  )
}

export default Page;

