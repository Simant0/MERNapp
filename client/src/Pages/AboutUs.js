import React from "react";
import "./AboutUs.css";
import Contact from "../Components/Contact";

function AboutUs() {
  return (
    <div className="aboutus" id="AboutUs">
      <section className="aboutus__intro">
        <div className="aboutus__heading">
          <h1> About Us</h1>
        </div>
        <div className="aboutus__content">
          <p>
            We have come to the market of food business in order to provide all
            the customers with variety of mouth watering foods made by our
            professional chefs at our semi-ghost kitchen. Ensuring proper
            hygiene and quality products, we offer our online and off line
            services of supplying various easy delicious foods either at your
            place or ours. Focusing ourselves to provide you an easiest online
            food service we offer various different foods from the world’s
            street. Our mission is not only to provide you with our food
            categorized in various sub sections like:{" "}
          </p>

          <ul>
            <li>Street foods or Fast Foods</li>
            <li>Healthy Salads</li>
            <li>Exciting cook at home</li>
          </ul>
          <p>
            But, we have also come up with an idea to make your personnel
            cooking better and eating habit exciting whenever you are enjoying
            with your family and friends. We intend you to teach the basics of
            our cooking and try to make you impress your loved ones with the
            delicious food you will be assembling at your home or any other
            function space ordering from our package “Get Cooking”. We simply
            provide you the variety of foods cooked by our professionals with
            vary easy tapping order online and try to maintain the ordering
            process and payment system very easy and convenient. More over we
            will be making our own delivery as well that benefits you to make
            any kind of communication with us at your ease.
          </p>
        </div>
      </section>
      <section className="aboutus__we">
        <div className="aboutus__weHeading">
          <h1>Co-founders</h1>
        </div>
        <div className="aboutus__weContent">
          <p>
            99fud (Ninety Nine Foods) have been brought into operation since
            2021 by three different personnel who have been working in the
            sector of food business since last 10 joyful years. All our
            co-founder being a professional Chef, they have brought up their
            technical skills and practical knowledge into this service to
            provide our entire potential customers a new conceptualized
            experience to enjoy with food. They have focused themselves to
            provide all sorts of information and knowledge to the customers
            related to their food.
          </p>
        </div>
        <div className="aboutus__us">
          <img src="" alt="" />
          <p>
            Our first Co-founder is a Pro Chinese-Asian Chef who has been
            working at various major Chinese and Asian restaurants round the
            city for over a decade. His appetizing and craving buster foods are
            now made available to the costumers directly from his kitchen to
            your place. As his dedication has been implemented to make sure your
            valuable food time gets utilized with good Chinese & Asian delicacy,
            he is Eveready to serve you just by your click.
          </p>
        </div>
        <div className="aboutus__us">
          <img src="" alt="" />
          <p>
            Our second Co-founder chef has been serving his Mexican and Arabic
            food to all the Customers or food lovers for more than 9 years. His
            serving at various hotel and restaurants have never failed to please
            the customers. All his experiences are now being brought in this
            organization just to serve you at your bed corner or at your office
            table, right at your food time. He will be sharing and teaching you
            about how to cook his menus in a simple way.
          </p>
        </div>
        <div className="aboutus__us">
          <img src="" alt="" />
          <p>
            With the admirable knowledge in cookery, our third co –founder and
            chef brings his skills from various national and international hotel
            and restaurants. His great Italian cooking, Bakery skills and
            knowledge of palate satisfying Thai cuisine are now been planned to
            share with you at your convenience, directly from his kitchen to you
            comfort place. He will be sending you his basic recipe at your door
            with the purchasing of our “Get Cooking” package in order to give
            you some basic cookery knowledge.
          </p>
        </div>
        <Contact />
      </section>
    </div>
  );
}

export default AboutUs;
