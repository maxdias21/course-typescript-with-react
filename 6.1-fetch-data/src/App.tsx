import {get} from "./util/http.ts";

import BlogPosts, {BlogPost} from "./components/BlogPosts.tsx";

import {type ReactNode, useEffect, useState} from "react";

import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from "./components/ErrorMessage.tsx";

type RawDataBlogPost = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

function App() {
    const [fetched, setFetched] = useState<BlogPost[]>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setIsFetching(true);
        async function fetchPosts() {
            try {
                const data = await get('https://jsonplaceholder.typicode.com/posts') as RawDataBlogPost[];
                console.log(data)
                const blogPosts: BlogPost[] = data.map(rawPost => {
                    return {
                        id: rawPost.id,
                        title: rawPost.title,
                        text: rawPost.body,
                    }
                });
                setFetched(blogPosts);
            }
             catch(error) {
                if(error instanceof Error) {
                    setError(error.message);
                }
             }


            setIsFetching(false);
        }

        fetchPosts();
    }, [])

    let content: ReactNode;

    if(error) {
        content = <ErrorMessage text={error} />
    }

    if(fetched) {
        content = <BlogPosts posts={fetched} />
    }

    if(isFetching) {
        content = <p id="loading-fallback">Fetching posts...</p>
    }

    return (
        <main>
            <img src={fetchingImg} alt={"An abstract image depicting a data fetching process."}/>
            {content}
        </main>
    );
}

export default App;
