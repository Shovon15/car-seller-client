import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen mx-auto max-w-5xl">
            <h1 className="text-start font-bold p-2 text-2xl">About Us</h1>
            <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 dark:bg-slate-700 rounded-box"
            >
                <div className="collapse-title text-xl font-medium">Lorem Ipsum is simply dummy text !!!</div>
                <div className="collapse-content ">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div>
            </div>
            <div
                tabIndex={1}
                className="collapse dark:bg-slate-700  collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
                <div className="collapse-title text-xl font-medium">Lorem Ipsum is simply dummy text !!!</div>
                <div className="collapse-content">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div>
            </div>
            <div
                tabIndex={2}
                className="collapse dark:bg-slate-700  collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
                <div className="collapse-title text-xl font-medium">Lorem Ipsum is simply dummy text !!!</div>
                <div className="collapse-content">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
