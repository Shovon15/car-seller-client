import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-300 text-base-content dark:bg-slate-800 dark:text-white">
            <div>
                <span className="footer-title">Services</span>
                <Link className="link link-hover">Branding</Link>
                <Link className="link link-hover">Design</Link>
                <Link className="link link-hover">Marketing</Link>
                <Link className="link link-hover">Advertisement</Link>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <Link className="link link-hover">About us</Link>
                <Link className="link link-hover">Contact</Link>
                <Link className="link link-hover">Jobs</Link>
                <Link className="link link-hover">Press kit</Link>
            </div>
            <div>
                <span className="footer-title">Social</span>
                <div className="grid grid-flow-col gap-4 ">
                    <Link>
                        <FaTwitter className="w-8 h-8" />
                    </Link>
                    <Link>
                        <FaYoutube className="w-8 h-8" />
                    </Link>
                    <Link>
                        <FaFacebookF className="w-8 h-8" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
