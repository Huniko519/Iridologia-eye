import React from 'react';
import {Link} from 'react-router-dom'

function Error404(props){
    return(
        <div class="container404">
            <div class="mainbox404">
                <div class="err404">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2404">4</div>
                <div class="msg404">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to = "/dashboard">home</Link> and try from there.</p></div>
            </div>
        </div>
    )
}

export default Error404;