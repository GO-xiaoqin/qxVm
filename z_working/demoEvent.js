/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-30 11:10:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-30 15:05:28
 * @FilePath: /qxVm/z_working/demoEvent.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */



function demoLoad(){
    function aaa(ooo){
        console.log(ooo)
        console.log("fadsgdsag")
        debugger;
    }
    
    
    window.addEventListener('load', aaa)

    lwVm.callListener('load');

    function target1(){ }

    lwVm.callListener('load', {
        target: target1,
        timeStamp: 1111,
    })
}




function demoClick(){
    function bbb(ooo){
        debugger;
        console.log(ooo)
        ooo.screenY
    }
    window.addEventListener('click', bbb)

    function target1(){ }

    lwVm.callListener('click', {
        timeStamp: 1111,
    })
}


demoLoad()
demoClick()

function get_dddd(){}