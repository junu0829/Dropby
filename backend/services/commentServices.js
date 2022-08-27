const { Comment, LikeComment } = require("../models");
const { getUserWithAccess } = require("../utils/auth");


exports.newComment = async (accessToken, body, dropPk) => {
    const user = await getUserWithAccess(accessToken);
    const { content } = body;

    const comment = await Comment.create({
        content,
        createdAt: Date(),
        creatorPk: user.pk,
        dropPk,
    });

    return comment;
};

exports.getComments = async (accessToken, dropPk) => {
    const user = await getUserWithAccess(accessToken);

    const comments = await Comment.findAll({
        where: {
            dropPk
        },
    });

    const commentsCount = comments.length;

    return {
        data: comments,
        commentsCount,
    }
}

exports.updateComment = async (body, dropPk, commentPk) => {

    const { content } = body;

    const comment = await Comment.findOne({
        where: {
            pk: commentPk
        },
    });

    comment.set({
        content
    });

    await comment.save();

    return comment;
}

exports.deleteComment = async (commentPk) => {

    const comment = await Comment.findOne({
        where: {
            pk: commentPk
        }
    });

    await comment.destroy();
    return true;
}

exports.toggleCommentLike = async (accessToken, commentPk) => {
    const user = await getUserWithAccess(accessToken);

    const likeComment = await LikeComment.findOne({
        where: {
            CommentPk: commentPk,
            UserPk: user.pk
        },
    });

    const comment = await Comment.findOne({
        where:{
            pk:commentPk
        }
    })
    if (likeComment) {
        comment.set({
            likesCount:comment.likesCount - 1
        });

        await comment.save();
        await likeComment.destroy();
        return 'OFF';
    }
    comment.set({
        likesCount:comment.likesCount + 1
    });

    await comment.save();

    const commentLiked = await LikeComment.create({
            CommentPk: commentPk,
            UserPk: user.pk
        })
    return 'ON';
}