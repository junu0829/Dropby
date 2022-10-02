const { Comment, LikeComment } = require("../models");
const { getUserWithAccess } = require("../utils/auth");
const { logger } = require("../utils/winston");

exports.newComment = async (accessToken, body, dropPk) => {
    try {
        const user = await getUserWithAccess(accessToken);
        const { content } = body;

        const comment = await Comment.create({
            content,
            createdAt: Date(),
            creatorPk: user.pk,
            dropPk,
        });
        logger.info(`Comment ${content} created for Drop id ${dropPk}`);
        return comment;
    } catch (error) {
        logger.error(`Failed to create a new Comment : ${error.message}`);
        throw new Error(`댓글 작성에 실패하였습니다.`);
    }
};

exports.getComments = async (accessToken, dropPk) => {
    try {
        const user = await getUserWithAccess(accessToken);

        const comments = await Comment.findAll({
            where: {
                dropPk,
            },
        });

        const commentsCount = comments.length;

        logger.info(`All comments of Drop id ${dropPk} retrieved : ${comments.length} in total`);
        return {
            data: comments,
            commentsCount,
        };
    } catch (error) {
        logger.error(`Failed to retrieve all comments of drop Id ${dropPk} : ${error.message}`);
        throw new Error(`${dropPk}번 드롭의 전체 댓글 조회에 실패하였습니다.`);
    }
};

exports.updateComment = async (body, dropPk, commentPk) => {
    try {
        const { content } = body;

        const comment = await Comment.findOne({
            where: {
                pk: commentPk,
            },
        });

        comment.set({
            content,
        });

        await comment.save();
        logger.info(`Comment update Success : updated to ${content}`);
        return comment;
    } catch (error) {
        logger.error(`Failed to update comment Id ${commentPk} : ${error.message}`);
        throw new Error(`댓글 내용 수정에 실패하였습니다.`);
    }
};

exports.deleteComment = async (commentPk) => {
    try {
        const comment = await Comment.findOne({
            where: {
                pk: commentPk,
            },
        });

        await comment.destroy();
        logger.info(`Successfully deleted Comment Id ${commentPk}`);
        return true;
    } catch (error) {
        logger.error(`Failed to delete comment Id ${commentPk} : ${error.message}`);
        throw new Error(`댓글 삭제에 실패하였습니다.`);
    }
};

exports.toggleCommentLike = async (accessToken, commentPk) => {
    try {
        const user = await getUserWithAccess(accessToken);

        const likeComment = await LikeComment.findOne({
            where: {
                CommentPk: commentPk,
                UserPk: user.pk,
            },
        });

        const comment = await Comment.findOne({
            where: {
                pk: commentPk,
            },
        });
        if (likeComment) {
            comment.set({
                likesCount: comment.likesCount - 1,
            });

            await comment.save();
            await likeComment.destroy();
            logger.info(`User ${user.nickname} toggled OFF comment Id ${commentPk}`);
            return "OFF";
        }
        comment.set({
            likesCount: comment.likesCount + 1,
        });

        await comment.save();

        const commentLiked = await LikeComment.create({
            CommentPk: commentPk,
            UserPk: user.pk,
        });
        logger.info(`User ${user.nickname} toggled ON comment Id ${commentPk}`);
        return "ON";
    } catch (error) {
        logger.info(
            `User ${user.nickname} failed to toggle likeComment Id ${commentPk} : ${error.message}`,
        );
        throw new Error(`댓글 좋아요 등록/해제에 실패하였습니다.`);
    }
};
