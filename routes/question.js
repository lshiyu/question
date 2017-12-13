const router=require('koa-router')();
const pool=require('../config/pool');
const questionModule = require('../module/question_module')
router.get('/list',async (ctx,next)=>{

    ctx.body={success:true,data:await questionModule.getList()}
})
router.get('/list/:id',async (ctx,next)=>{
    let params=ctx.params;
    if(params){
        ctx.body={success:true,data:await questionModule.getListId(params)}
    }
});
router.get('/option-lists/:id',async(ctx,next)=>{
    let params=ctx.params;
    if(params){
        ctx.body={success:true,data:await questionModule.optionListId(params)}
    }
})
router.post('/add',async (ctx,next)=>{
    let params=ctx.request.body;
    let type=0;
    console.log(params);
    if(params){
        switch (params.type){
            case "单选":
                type=1;
                break;
            case "多选":
                type=2;
                break;
        }
        ctx.body={success:true,data:await questionModule.addQuestion(params,type)}
    }
});
router.post('/add/options',async (ctx,next)=>{
    let params=ctx.request.body;
    if(params.id&&params.content){
        ctx.body={success:true,data: await questionModule.addOptions(params)}
    }
});
router.post('/update',async(ctx,next)=>{
    let params=ctx.request.body;
    if(params){
        ctx.body={success:true,data:await questionModule.questionUpdate(params)}
    }
});
router.post('/delete/:id',async(ctx,next)=>{
    let params=ctx.params;
    if(params){
        ctx.body={success:true,data:await questionModule.questionDelete(params)}
    }
})
module.exports=router;