import React from "react";
import {
    IconGithub,
    IconInstagram,
    IconLinkedin,
    IconTwitter,
} from "./icons/icons";

import './footer.css'

const FooterUI = () => {
    return (
        <footer className="container">
            <section className="socialBox">
                <span>
                    <a href="https://www.instagram.com/jerly_hdt/?hl=es"
                        aria-label="instagram"
                    >
                        <IconInstagram />
                    </a>
                </span>
                <span>
                    <a href="https://github.com/sr-jerly"
                        aria-label="github">
                        <IconGithub />
                    </a>
                </span>
                <span>
                    <a href="https://www.linkedin.com/in/jerlydelarosa/"
                        aria-label="linkedin">
                        <IconLinkedin />
                    </a>
                </span>
                <span>
                    <a href="https://twitter.com/sr_jerly"
                        aria-label="twitter">
                        <IconTwitter />
                    </a>
                </span>
            </section>
            <hr className="line" />
            <p>
                &copy; Copyright 2021{" "}
                <a href="https://www.linkedin.com/in/jerlydelarosa/">
                    &copy; Jerly De La Rosa
                </a>
            </p>
        </footer>
    );
};

export default FooterUI;

// const Container = styled.div`
//   background-color: ${(props) => props.bgColor};
//   color: white;
//   padding: 2rem 1rem;
// `;

// const SocialBox = styled.span`

// `;

// const Line = styled.hr`

// `;