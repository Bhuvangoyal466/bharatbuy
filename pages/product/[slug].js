import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter();
    const { slug } = router.query;

    return <p>{slug}</p>;
};

export default Post;
