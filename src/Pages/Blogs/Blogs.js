import React from "react";

const Blogs = () => {
    return (
        <>
            <div className="card-body mx-5 md:mx-10 bg-slate-200 dark:bg-slate-600 my-10 rounded-xl font-medium">
                <h1 className="text-center text-2xl font-bold">
                    How many ways to manage a state <br /> in a React application?
                </h1>
                <div>
                    <p>There are four main types of state you need to properly manage in your React apps:</p>
                    <div className="p-5">
                        <p>01. Local state</p>
                        <p>02. Global state</p>
                        <p>03. Server state</p>
                        <p>04. URL state</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">Local (UI) state:</p>
                        <p className="py-2">Local state is data we manage in one or another component.</p>
                        <p className="py-2">Local state is most often managed in React using the useState hook.</p>
                        <p className="py-2">
                            For example, local state would be needed to show or hide a modal component or to track
                            values for a form component, such as form submission, when the form is disabled and the
                            values of a form’s inputs.
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-xl mt-5">Global (UI) state:</p>
                        <p className="py-2">
                            Global state is data we manage across multiple components. Global state is necessary when we
                            want to get and update data anywhere in our app, or in multiple components at least.
                        </p>
                        <p className="py-2">
                            A common example of global state is authenticated user state. If a user is logged into our
                            app, it is necessary to get and change their data throughout our application.
                        </p>
                        <p className="py-2">Sometimes state we think should be local might become global.</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl mt-5">Server state:</p>
                        <p className="py-2">
                            Data that comes from an external server that must be integrated with our UI state.
                        </p>
                        <p className="py-2">
                            Server state is a simple concept, but can be hard to manage alongside all of our local and
                            global UI state.
                        </p>
                        <p className="py-2">
                            There are several pieces of state that must be managed every time you fetch or update data
                            from an external server, including loading and error state.
                        </p>
                        <p className="py-2">
                            Fortunately there are tools such as SWR and React Query that make managing server state much
                            easier.
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-xl mt-5">URL state:</p>
                        <p className="py-2">
                            Data that exists on our URLs, including the pathname and query parameters.
                        </p>
                        <p className="py-2">
                            URL state is often missing as a category of state, but it is an important one. In many
                            cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine
                            building a blog without being able to fetch a post based off of its slug or id that is
                            located in the URL!
                        </p>
                        <p className="py-2">
                            There are undoubtedly more pieces of state that we could identify, but these are the major
                            categories worth focusing on for most applications you build.
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-body mx-5 md:mx-10 bg-slate-200 dark:bg-slate-600 my-10 rounded-xl font-medium">
                <h1 className="text-center text-2xl font-bold">how does prototypical inheritance work</h1>

                <p className="py-2">
                    JavaScript is a prototype-based, Object Oriented programming language. After the ES6 updates,
                    JavaScript allowed for “prototypal inheritance”, meaning that objects and methods can be shared,
                    extended, and copied.
                </p>
                <p className="py-2">
                    Simply put, prototypical inheritance refers to the ability to access object properties from another
                    object. We use a JavaScript prototype to add new properties and methods to an existing object
                    constructor. We can then essentially tell our JS code to inherit properties from a prototype.
                    Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to
                    another through a reference pointer function.
                </p>
            </div>
            <div className="card-body mx-5 md:mx-10 bg-slate-200 dark:bg-slate-600 my-10 rounded-xl font-medium">
                <h1 className="text-center text-2xl font-bold">What is a unit test? Why should we write unit tests?</h1>

                <p className="py-2">
                    Unit testing is a software development process in which the smallest testable parts of an
                    application, called units, are individually and independently scrutinized for proper operation. This
                    testing methodology is done during the development process by the software developers and sometimes
                    QA staff. The main objective of unit testing is to isolate written code to test and determine if it
                    works as intended. Unit testing is an important step in the development process, because if done
                    correctly, it can help detect early flaws in code which may be more difficult to find in later
                    testing stages.
                </p>
                <p className="py-2">
                    Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a
                    meticulous approach to building a product by means of continual testing and revision. This testing
                    method is also the first level of software testing, which is performed before other testing methods
                    such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any
                    external code or functions. Testing can be done manually but is often automated.
                </p>
            </div>
        </>
    );
};

export default Blogs;
