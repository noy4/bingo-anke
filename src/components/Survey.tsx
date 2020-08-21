import React, { useState, useEffect } from 'react';
import { createPost } from '../graphql/mutations';
import { onCreatePost } from '../graphql/subscriptions';
import { listPostsSortedByTimestamp } from '../graphql/queries';
import API, {graphqlOperation} from '@aws-amplify/api';
import { OnCreatePostSubscription } from '../API';

interface IPost {
    type: string;
    id: string;
    content: string;
    owner: string | null;
    timestamp: number;
}

interface IValue {
    playerName: string;
    playerSex: string;
}

interface SubscriptionValue<T> {
    value: { data: T };
}

const Survey = () => {
    const [value, setValue] = useState<IValue>({
        playerName: '',
        playerSex: '',
    });
    const [posts, setPosts] = useState<IPost[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target != null){
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            setValue(state => ({...state, [name]: value}));
        }
    }

    const onPost = async () => {
        const res = await API.graphql(graphqlOperation(createPost, { input: {
          type: 'post',
          content: value.playerName,
          timestamp: Date.now(),
        }}));
        console.log(res);
        // setValue({playerName: "", playerSex: ""});
    };

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
          type: "post",
          sortDirection: 'DESC',
          limit: 20, //default = 10
          nextToken: nextToken,
        }));
        setPosts(res.data.listPostsSortedByTimestamp.items);
      };

    useEffect(() => {
        getPosts();
        console.log('before subscription');

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
          next: (msg: SubscriptionValue<OnCreatePostSubscription>) => {
              if (msg.value.data.onCreatePost) {
                console.log('subscription fired');
                const post = msg.value.data.onCreatePost;
                setPosts(state => ([post, ...state]));
              }
            
          }
        });
        return () => subscription.unsubscribe();
    }, []);

    const title = "タイプスクリプト版アンケート";

    return (
        <div>
        <form>
            <div className="title box"><h1>{title}</h1></div>

            <div className="player-name box">
            <label htmlFor="playerName">
                名前：
                <input 
                name="playerName"
                type="text"
                value={value.playerName}
                onChange={handleInputChange} />
            </label>
            </div>
            <div className="player-sex box">
            <label>
                性別：
                <input
                name="playerSex"
                type="radio"
                value="male"
                checked={value.playerSex === 'male'}
                onChange={handleInputChange}
                className="player-sex-input"/>
                男性
            </label>
            <label>
                <input
                name="playerSex"
                type="radio"
                value="female"
                checked={value.playerSex === 'female'}
                onChange={handleInputChange}
                className="player-sex-input"/>
                女性
            </label>
            </div>
        </form>
        <button onClick={onPost}>送信</button>
        <div>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
                // console.log(post)
            ))}
        </div>
        </div>
    );
};

export default Survey;