import { 
    Devvit,
    Context,
    UserContext,
    RedditAPIClient,
} from '@devvit/public-api';

const reddit = new RedditAPIClient();

Devvit.addAction({
    context: Context.COMMENT,
    userContext: UserContext.MODERATOR,
    name: 'Display Links', // text to display in the menu (keep it short!)
    description: 'Show all links in this comment',
    handler: async (event) => {
        const body = event.comment?.body
        if (typeof body === 'string') {
            const links = body.match(/(?<!\[)http[^\s)\]\[\\]+(?!\])/g) || [];
            if (links.length !== 0) {
                const message = links.join('\n\n');
                return { success: true, message };
            }
        }
        const message = `No links found in this comment.`
        return { success: false, message };
    },
});
Devvit.addAction({
    context: Context.POST,
    userContext: UserContext.MODERATOR,
    name: 'Display Links', // text to display in the menu (keep it short!)
    description: 'Show all links in this post',
    handler: async (event, metadata) => {
        const id = 't3_' + event.post?.id
        if (typeof id ==='string') {
        const post = await reddit.getPostById(id, metadata);
        const texts = post.body
            if (typeof texts === 'string') {
                const links = texts.match(/(?<!\[)http[^\s)\]\[\\]+(?!\])/g) || [];
                    if (links.length !== 0) {
                        const message = links.join('\n\n');
                        return { success: true, message };
                    }
            }
        }
        const message = `No links found in this post.`
        return { success: false, message };
    },
});


export default Devvit;