const commentServices = require("../services/commentServices");
const { getAccess } = require("../utils/auth");

exports.newComment = async (req, res, next) => {
  try {
    const { dropPk } = req.params;
    const accessToken = getAccess(req.headers);
    const comment = await commentServices.newComment(accessToken, req.body, dropPk);

    res.status(201).json({
      msg: "댓글 생성 완료",
      data: comment,
      success:true
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const { dropPk } = req.params;
    const accessToken = getAccess(req.headers);

    const {data, commentsCount} = await commentServices.getComments(accessToken, dropPk);

    res.status(200).json({
      msg:'해당 드롭 전체 댓글 조회 완료',
      // dropPk 넣기 
      data: data,
      commentsCount,
      }
    )
  } catch (error) {
    next(error);
  }
}

exports.updateComment = async (req, res, next) => {
  try {
    const { dropPk, commentPk } = req.params;

    const updatedComment = await commentServices.updateComment(req.body, dropPk, commentPk);

    res.status(200).json({
      msg: "댓글 수정 완료",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentPk = req.params.commentPk;
    const commentDeleted = await commentServices.deleteComment(commentPk);

    res.status(200).json({
      msg: "댓글 삭제 완료",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleCommentLike = async (req, res, next) => {
  try {
    const commentPk = req.params.commentPk;
    const accessToken = getAccess(req.headers);
    const status = await commentServices.toggleCommentLike(accessToken, commentPk);

    if (status === 'ON') {
      res.status(200).json({
        msg:'좋아요 등록',
        status:"ON"
      })
    }
    if (status === 'OFF') {
      res.status(200).json({
        msg:'좋아요 해제',
        status:"OFF"
      });
    }
  throw new Error();
  } catch(error) {
    console.log(error);
  }
}
// exports.getDrop = async (req, res, next) => {
//   try {
//     const dropPk = req.params.dropPk;
//     const {writtenPlace, drop} = await dropServices.getDrop(dropPk);
//     res.status(200).json({
//       msg:'단일 드롭 조회 완료',
//       writtenPlace,
//       data:drop
//     })
//   } catch (error) {
//     next(error);
//   }
// }