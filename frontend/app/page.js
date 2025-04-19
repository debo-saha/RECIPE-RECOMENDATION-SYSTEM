// pages/index.js
"use client";


import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight animate-fadeInUp">
              Discover Your Perfect Meal with 
              <span className="text-amber-600"> AI-Powered</span> Recipes
            </h1>
            <p className="text-xl text-gray-600 animate-fadeInUp delay-100">
              Get personalized recipe recommendations based on your ingredients, diet, and preferences!
            </p>
            <div className="flex gap-4 animate-fadeInUp delay-200">
                <Link href={"/creativerecipe"}>
              <button className="px-8 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-200">
                Get Started Free
              </button>
                </Link>
                <Link href={"/searchDish"}>
                <button className="px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-xl hover:bg-amber-50 transition-all">
                Search Your Dish
              </button>
                </Link>

              
            </div>
          </div>

          {/* Anime Character */}
          <div className="flex-1 relative">
            <div className="relative max-w-md mx-auto animate-float">
              <svg
                className="w-full h-auto"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M200 400C310.457 400 400 310.457 400 200C400 89.5433 310.457 0 200 0C89.5433 0 0 89.5433 0 200C0 310.457 89.5433 400 200 400Z"
                  fill="#FEE2B3"
                />
                <path
                  d="M150 220L160 300H240L250 220H150Z"
                  fill="#FF9B76"
                />
                <path
                  d="M180 120H220V200H180V120Z"
                  fill="#FF9B76"
                />
                <circle cx="200" cy="160" r="80" fill="#FFD3B3"/>
                <path
                  d="M160 140C160 128.954 168.954 120 180 120V120C191.046 120 200 128.954 200 140V160H160V140Z"
                  fill="#FF9B76"
                />
                <circle cx="170" cy="150" r="10" fill="#2D2D2D"/>
                <circle cx="230" cy="150" r="10" fill="#2D2D2D"/>
                <path
                  d="M180 190L220 190"
                  stroke="#2D2D2D"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="absolute top-20 -left-20 w-24 h-24 bg-amber-200/30 rounded-full animate-blob"></div>
            <div className="absolute bottom-0 -right-20 w-32 h-32 bg-amber-300/30 rounded-full animate-blob delay-2000"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 animate-fadeInUp">
            Why Choose ChefAI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {icon: '🤖', title: 'AI-Powered Recommendations', desc: 'Machine learning algorithms that understand your taste'},
              {icon: '🥗', title: 'Dietary Customization', desc: 'Gluten-free, vegan, keto & more dietary options'},
              {icon: '⏱️', title: 'Quick Meal Planning', desc: 'Generate weekly plans in seconds'},
            ].map((feature, i) => (
              <div key={i} className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp delay-${(i+2)*100}`}>
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 animate-fadeInUp">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-8">
              {[
                {step: '1', title: 'Tell Us Your Preferences', desc: 'Select ingredients, dietary needs & cooking time'},
                {step: '2', title: 'AI Generates Options', desc: 'Our system creates personalized recipes'},
                {step: '3', title: 'Cook & Enjoy', desc: 'Follow step-by-step instructions with timers'},
              ].map((step, i) => (
                <div key={i} className={`flex gap-4 items-start animate-fadeInUp delay-${(i+3)*100}`}>
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 relative">
              <div className="max-w-md mx-auto animate-float">
                <svg className="w-full h-auto" viewBox="0 0 512 512" fill="none">
                  <path d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="#FEE2B3"/>
                  <path d="M256 128L384 256L256 384L128 256L256 128Z" fill="#FF9B76"/>
                  <path d="M256 160L320 224L256 288L192 224L256 160Z" fill="#FFD3B3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 animate-fadeInUp">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {name: 'Sarah T.', role: 'Home Chef', text: 'ChefAI transformed my weekly meal planning! The recipes are always exciting and easy to follow.'},
              {name: 'Mike R.', role: 'Busy Parent', text: 'Finally found a service that understands my family dietary needs. The AI suggestions are spot-on!'},
            ].map((testimonial, i) => (
              <div key={i} className={`p-8 bg-white rounded-2xl shadow-lg animate-fadeInUp delay-${(i+4)*100}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    👩🍳
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-float">
            <div className="text-6xl mb-8">👩🍳</div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Cooking?
          </h2>
          <Link href="/creativerecipe">
          <button className="px-8 py-4 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all transform hover:scale-105 shadow-lg font-semibold">
            Check Our Smartee Recomender
          </button>
          </Link>
        </div>
      </section>

      

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-amber-200/10 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}