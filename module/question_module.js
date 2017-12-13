const pool=require('../config/pool');
module.exports={
    //获得问题列表
    getList:()=>{
        return pool.query(moduleSql.list,[])
    },
    //获得指定问题详情
    getListId:params=>{
        return pool.query(moduleSql.listId,[params.id])
    },
    //获得指定问题的选项
    optionListId:params=>{
        return pool.query(moduleSql.optionListId,[params.id])
    },
    //添加问题
    addQuestion:(params,type)=>{
        return pool.query(moduleSql.addQuestion,[params.content,new Date(),'',type,params.score])
    },
    //给指定问题添加选项
    addOptions:params=>{
        return pool.query(moduleSql.addOptions,[params.id,params.content,new Date()])
    },
    //更新问题
    questionUpdate:params=>{
        return pool.query(moduleSql.questionUpdate,[params.content,params.type,params.answer,params.score,params.id])
    },
    //删除问题
    questionDelete:params=>{
        return pool.query(moduleSql.questionDelete,[params.id])
    }
}
const moduleSql = {
    list:'select * from t_question',
    listId:'select * from t_question where question_id=?',
    optionListId:'select * from t_question_options where qo_q_id=?',
    addQuestion:'insert into t_question (question_content,question_create_time,question_answer,question_type,question_score)values(?,?,?,?,?)',
    addOptions:'insert into t_question_options (qo_q_id,qo_content,qo_create_time) values(?,?,?)',
    questionUpdate:'update t_question set question_content=?,question_type=?, question_answer=?,question_score=? where question_id=?',
    questionDelete:'delete from t_question where question_id=?'
}