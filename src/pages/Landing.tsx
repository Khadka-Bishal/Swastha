import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Heart,
  Stethoscope,
  Brain,
  Users,
  Globe,
  Activity,
  Clock,
  Shield,
  Laptop,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Calendar,
  User,
} from "lucide-react";
import { signInWithGoogle } from "../utils/firebase";
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Stethoscope,
    title: "Remote Monitoring",
    description:
      "Record and analyze heart sounds from anywhere using our innovative DGscope device, making cardiac care accessible from the comfort of your home.",
  },
  {
    icon: Activity,
    title: "Instant Analysis",
    description:
      "Get preliminary insights from our AI model that analyzes heart sound patterns, helping remote doctors make informed decisions quickly.",
  },
  {
    icon: Users,
    title: "Specialist Referral",
    description:
      "Connect rural healthcare providers with specialist doctors in referral hospitals for expert second opinions and diagnosis.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access healthcare expertise anytime, anywhere with our round-the-clock service, ensuring continuous cardiac care support.",
  },
  {
    icon: Laptop,
    title: "Teleconsultation",
    description:
      "Enable direct patient-to-doctor consultations with guided tutorials for proper DGscope placement and remote examination.",
  },
  {
    icon: Globe,
    title: "Offline Support",
    description:
      "Work seamlessly in areas with limited connectivity through our offline-first approach and efficient data synchronization.",
  },
];

const stats = [
  { value: "50,000+", label: "Patients Served" },
  { value: "1,000+", label: "Specialist Doctors" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const blogPosts = [
  {
    title: "Transforming Rural Healthcare in South Asia",
    excerpt:
      "How digital stethoscopes and telemedicine are revolutionizing cardiac care in remote villages of Bangladesh and Nepal.",
    date: "March 15, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Southeast Asian Telemedicine Success Stories",
    excerpt:
      "Case studies from Indonesia and Philippines showing how remote diagnostics are bridging the urban-rural healthcare divide.",
    date: "March 10, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI in Rural Health Monitoring",
    excerpt:
      "How machine learning is helping rural doctors in India make preliminary cardiac diagnoses with limited resources.",
    date: "March 5, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
];

const animationCSS = `
  @keyframes countUp {
    from {
      transform: translateY(20%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const StatsItem = ({ value, label }: { value: string, label: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      // Extract numeric value and handle special cases
      let finalValue = value.includes('/')
        ? 24 // for 24/7
        : parseInt(value.replace(/[^0-9]/g, ''));

      // Animation duration in ms
      const duration = 3000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentCount = Math.round(progress * finalValue);
        
        setCount(currentCount);
        
        if (currentStep === steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  const displayValue = value.includes('/')
    ? '24/7'
    : value.includes('%')
    ? `${count}%`
    : `${count.toLocaleString()}+`;

  return (
    <div ref={ref} className="mx-auto flex max-w-xs flex-col gap-y-4">
      <dt className="text-base leading-7 text-gray-600">{label}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {inView ? displayValue : '0'}
      </dd>
    </div>
  );
};

export function Landing() {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="hero" className="relative isolate overflow-hidden">
        <style>{animationCSS}</style>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.rose.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-rose-600/10 ring-1 ring-rose-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                New: AI-powered heart sound analysis.{" "}
                <button 
                  onClick={() => scrollToSection('features')}
                  className="font-semibold text-rose-600 hover:text-rose-500 transition-colors duration-200"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Remote Heart Monitoring for Better Healthcare
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect with cardiac specialists worldwide through our
                innovative DGscope technology. Get instant analysis and expert
                opinions from the comfort of your home.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-2 rounded-md bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <dl className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <StatsItem key={stat.label} {...stat} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 border-t border-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-rose-600">
              Advanced Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for remote cardiac care
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive platform combines cutting-edge technology with
              medical expertise to provide the best remote cardiac care
              experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-rose-600"
                      aria-hidden="true"
                    />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-white border-t border-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-rose-600">
              Blog
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Remote Healthcare in Asia
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover how telemedicine and digital diagnostics are transforming
              healthcare delivery in rural and remote areas across Asia.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="flex flex-col h-full justify-between"
              >
                {/* Content Container */}
                <div>
                  {/* Image */}
                  <div className="relative w-full">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                  </div>

                  <div className="mt-8">
                    {/* Date */}
                    <div className="flex items-center gap-x-4 text-sm text-gray-500">
                      <Calendar className="h-5 w-5" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-2xl font-bold leading-6 text-gray-900">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-5 text-base leading-7 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read More Link - Now in a separate div at the bottom */}
                <div className="mt-8">
                  <Link
                    to={`/blog/${post.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center"
                  >
                    Read more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Articles link */}
          <div className="mt-16 flex items-center justify-center">
            <div className="group inline-flex items-center border-b border-transparent hover:border-rose-600 transition-all duration-300">
              <Link
                to="/blogs"
                className="text-base font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-200 flex items-center gap-2"
              >
                View all articles
                <ArrowRight 
                  className="h-4 w-4 text-gray-600 group-hover:text-rose-600 group-hover:translate-x-1 transition-all duration-200" 
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
