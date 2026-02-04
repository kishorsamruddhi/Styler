import React from "react";

const Home = () => {
  return (
    <div>
      {/* Company Profile */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Company Profile
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We are a visionary creative agency dedicated to blending art and technology for unforgettable digital experiences. Our team specializes in web development, sophisticated visual
            designs, and next-level content creation, helping brands stand out in a crowded marketplace. From businesses seeking elegant websites to global brands demanding blockbuster CGI and seamless
            post-production, we deliver excellence that inspires.
          </p>
          <div className="text-xs space-y-2">
            <p className="text-green-600 font-medium">Our Mission</p>
            <p className="text-gray-600">
              To empower cutting-edge brands with stunning, interactive, and
              optimized digital solutions, forming the backbone of modern
              creative storytelling. We believe every project deserves
              originality and high-impact visual identity.
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-blue-600">•</span>
                  <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                    About Us
                  </h2>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  We are a visionary creative agency dedicated to blending art
                  and technology for unforgettable digital experiences.
                </h3>
                <p className="text-lg text-gray-600">
                  Our team specializes in web development, sophisticated visual
                  designs, and next-level content creation, helping brands stand
                  out in a crowded marketplace. From businesses seeking elegant
                  websites to global brands demanding blockbuster CGI and seamless
                  post-production, we deliver excellence that inspires.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">What we do</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Web Development: Responsive, interactive, and mobile-first websites crafted for seamless performance.</li>
                    <li>• Graphic Design: Logos, brochures, catalogs, and brand assets tailored to elevate your business presence.</li>
                    <li>• Advertisement Creation: Eye-catching campaigns powered by design strategy, motion graphics, and engaging copy.</li>
                    <li>• Content Creation: End-to-end solutions including blogs, videos, social media, and product launches.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How we do it</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Videos & Shorts: From commercial ads to cinematic shorts, we offer concept-to-delivery motion visuals and impactful storytelling.</li>
                    <li>• Post Production: Professional editing, color grading, sound design, and finishing for all media.</li>
                    <li>• CGI, VFX & 3D Blender: High-end computer graphics, visual effects, animated scenes, and mesmerizing 3D art for digital and film projects.</li>
                  </ul>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-gray-900">Our Unique Edge</h3>
                <p className="text-gray-600">
                  <span className="text-green-600 font-medium">Top-tier VFX & CGI Teams:</span> Inspired by global leaders, we push the boundaries of digital
                  storytelling with meticulous attention to detail and innovation.
                  <br />
                  <br />
                  <span className="text-green-600 font-medium">Creative Collaboration:</span> Designers, developers, animators, and strategists work
                  hand-in-hand for powerful outcomes.
                  <br />
                  <br />
                  <span className="text-green-600 font-medium">Premium Quality Assurance:</span> Every deliverable is crafted to meet international
                  standards and distinctive brand goals.
                  <br />
                  <br />
                  <span className="text-green-600 font-medium">Complete Branding Support:</span> From naming to domain selection, we ensure your
                  identity is unique and memorable.
                </p>
              </div>
              <div className="text-gray-600">
                <h3 className="font-semibold mb-3 text-gray-900">Our Clients</h3>
                <p className="text-sm">
                  We partner with startups, established enterprises, and global
                  brands looking to unlock their creative potential and expand
                  their digital footprint.
                </p>
              </div>
              <div className="text-gray-600">
                <h3 className="font-semibold mb-3 text-gray-900">Contact Information</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Location: Bhubaneswar, Odisha, India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
