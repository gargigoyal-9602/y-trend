import React, { useState, Fragment, useEffect } from 'react';
import './css/index.scoped.css'
import {
    Container, Row, Col,
    Button
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import langg from "../../language";
import commands from "../../commands";



function Item(props) {
    return (
        props.isLastItem ?
            <div class="yt-review-item d-flex" style={{ marginBottom: "unset" }}>
                <img src={props.imageUrl ? props.imageUrl : require("./images/profile-image.png")} alt="Profile Image" class="profile-image" width="62" height="62" />
                <div class="text-content-block" style={{ borderBottom: "unset", paddingBottom: "unset" }}>
                    <div class="item-name">{props.name}</div>
                    <div class="item-comment">{props.comment}</div>
                </div>
            </div>
            :
            <div class="yt-review-item d-flex">
                <img src={props.imageUrl ? props.imageUrl : require("./images/profile-image.png")} alt="Profile Image" class="profile-image" width="62" height="62" />
                <div class="text-content-block">
                    <div class="item-name">{props.name}</div>
                    <div class="item-comment">{props.comment}</div>
                </div>
            </div>
    );
}

function AboutUsReviews() {
    const history = useHistory();
    const [feedbacks, setFeedbacks] = useState([]);
    const isReviewPage = history.location.pathname === "/reviews";
    const lang = new langg("aboutUsScreen");
    const [limit, setLimit] = useState(5);

    useEffect(async () => {
        var feedbacks = await commands.pages.getFeedbacks();
        
        /*
        for (let i = 0; i< 4;i++) {
            feedbacks.push(feedbacks[0]);
        }*/

        setFeedbacks(Array.isArray(feedbacks) ? feedbacks : []);
    }, []);


    return feedbacks.length > 0 ? (
        <section className="yt-review-main-wrapper" style={isReviewPage || feedbacks.length <= 5 ? {} : { marginBottom: "100px" }}>
            <Container>
                <div className="yt-inner-wrap">
                    <h2 class="yt-section-title mt-0 mb-0">
                        {lang.get("whatourcustomer", "What our Customer say")}
                    </h2>
                    <div className="yt-inner-content bg-white border-radius-10">
                        {!isReviewPage ?
                            <Fragment>
                                {feedbacks.map((item, idx) => idx < limit && (
                                    <Item isLastItem={feedbacks.length - 1 === idx} name={item.customer_name} comment={item.description} imageUrl={item.profile_image} />
                                ))}
                                {limit > 5 ?
                                    <Button color="secondary yt-review-btn " onClick={() => setLimit(5) /*history.push("/reviews")*/} >{lang.get("readless", "Read Less")}</Button>

                                    :
                                    feedbacks.length > 5 && <Button color="secondary yt-review-btn " onClick={() => setLimit(20) /*history.push("/reviews")*/} >{lang.get("readmore", "Read More")}</Button>
                                }
                            </Fragment>
                            :
                            <Fragment>
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                <Item isLastItem={true} name="Rameshwar Maheta" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                            </Fragment>
                        }
                    </div>
                </div>
            </Container>
        </section >)
        : null;
}


export default AboutUsReviews;