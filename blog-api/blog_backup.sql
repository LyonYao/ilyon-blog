-- SQLite database backup of blog.db
-- Generated on 2025-06-07 09:46:50

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data for table users
INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at) VALUES (1, 'admin', 'admin@example.com', 'pbkdf2:sha256:260000$avN64LSRRNlJzNrq$3bb66c83d09382f56c3e4ffd081465f534eb7b540869bfcfd104dc3c0d0031a6', 'admin', '2025-06-04 14:33:55', '2025-06-04 14:33:55');
INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at) VALUES (2, 'user', 'user@example.com', 'pbkdf2:sha256:260000$W8M3F0Bo06FZ9L1G$4557ae240f2f5e9203b989743dcd9473acfa4f244fe4d3267fa618bb1589e929', 'user', '2025-06-04 14:33:55', '2025-06-04 14:33:55');

CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Data for table user_sessions
INSERT INTO user_sessions (id, user_id, token, created_at, expires_at) VALUES (1, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDkwNTE1OTgsImlhdCI6MTc0OTA0OTc5OCwic3ViIjoxfQ.QSz4lAl5VK6Sn8ia895Krz4ipKJAydu7_GARnVY6JzE', '2025-06-04 15:09:58.640911', '2025-06-04 15:39:58.640911');

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT 0,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Data for table posts
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (1, '10 Tips for Better JavaScript', '<h2>Introduction to JavaScript</h2>
<p>JavaScript is a powerful tool in modern web development. This article will guide you through the basics and help you get started with your first project.</p>
<h3>Why Learn JavaScript?</h3>
<p>Learning JavaScript can significantly enhance your development skills and open up new career opportunities. It''s widely used in the industry and has a strong community support.</p>
<h3>Setting Up Your Environment</h3>
<p>To get started with JavaScript, you''ll need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
<h3>Your First JavaScript Project</h3>
<p>Let''s create a simple project to demonstrate the basic concepts of JavaScript. Follow along with the code examples below.</p>
<h3>Conclusion</h3>
<p>Now that you have a basic understanding of JavaScript, you can continue exploring more advanced topics and building more complex applications.</p>', '2024-12-20 22:33:55', '2025-05-06 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (2, 'Advanced Frontend Frameworks Techniques', '<h2>Frontend Frameworks Best Practices</h2>
<p>Following best practices in Frontend Frameworks is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Frontend Frameworks.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Frontend Frameworks code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Frontend Frameworks code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Frontend Frameworks code thoroughly.</p>', '2024-09-02 22:33:55', '2025-03-27 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (3, 'React Development for Beginners', '<h2>Advanced React Development Techniques</h2>
<p>Once you''ve mastered the basics of React Development, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in React Development</h3>
<p>Understanding and implementing design patterns can significantly improve your React Development code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in React Development applications.</p>
<h3>Integration with Other Technologies</h3>
<p>React Development works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling React Development Applications</h3>
<p>As your application grows, you''ll need strategies to scale your React Development implementation. This section covers key scaling considerations.</p>', '2025-02-24 22:33:55', '2025-03-19 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (4, 'The Future of Performance Optimization', '<h2>Performance Optimization Best Practices</h2>
<p>Following best practices in Performance Optimization is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Performance Optimization.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Performance Optimization code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Performance Optimization code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Performance Optimization code thoroughly.</p>', '2024-08-12 22:33:55', '2025-04-12 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (5, 'Understanding Performance Optimization Fundamentals', '<h2>Introduction to Performance Optimization</h2>
<p>Performance Optimization is a powerful tool in modern web development. This article will guide you through the basics and help you get started with your first project.</p>
<h3>Why Learn Performance Optimization?</h3>
<p>Learning Performance Optimization can significantly enhance your development skills and open up new career opportunities. It''s widely used in the industry and has a strong community support.</p>
<h3>Setting Up Your Environment</h3>
<p>To get started with Performance Optimization, you''ll need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
<h3>Your First Performance Optimization Project</h3>
<p>Let''s create a simple project to demonstrate the basic concepts of Performance Optimization. Follow along with the code examples below.</p>
<h3>Conclusion</h3>
<p>Now that you have a basic understanding of Performance Optimization, you can continue exploring more advanced topics and building more complex applications.</p>', '2024-10-21 22:33:55', '2025-01-16 22:33:55', 0, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (6, 'Why UI/UX Design Matters in 2023', '<h2>UI/UX Design Best Practices</h2>
<p>Following best practices in UI/UX Design is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with UI/UX Design.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your UI/UX Design code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your UI/UX Design code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your UI/UX Design code thoroughly.</p>', '2024-10-25 22:33:55', '2025-05-27 22:33:55', 0, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (7, 'The Ultimate Guide to Frontend Frameworks', '<h2>Frontend Frameworks Best Practices</h2>
<p>Following best practices in Frontend Frameworks is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Frontend Frameworks.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Frontend Frameworks code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Frontend Frameworks code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Frontend Frameworks code thoroughly.</p>', '2025-04-24 22:33:55', '2025-06-03 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (8, 'The Future of Mobile Development', '<h2>Advanced Mobile Development Techniques</h2>
<p>Once you''ve mastered the basics of Mobile Development, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in Mobile Development</h3>
<p>Understanding and implementing design patterns can significantly improve your Mobile Development code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in Mobile Development applications.</p>
<h3>Integration with Other Technologies</h3>
<p>Mobile Development works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling Mobile Development Applications</h3>
<p>As your application grows, you''ll need strategies to scale your Mobile Development implementation. This section covers key scaling considerations.</p>', '2024-10-15 22:33:55', '2025-04-02 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (9, 'Responsive Design for Beginners', '<h2>Introduction to Responsive Design</h2>
<p>Responsive Design is a powerful tool in modern web development. This article will guide you through the basics and help you get started with your first project.</p>
<h3>Why Learn Responsive Design?</h3>
<p>Learning Responsive Design can significantly enhance your development skills and open up new career opportunities. It''s widely used in the industry and has a strong community support.</p>
<h3>Setting Up Your Environment</h3>
<p>To get started with Responsive Design, you''ll need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
<h3>Your First Responsive Design Project</h3>
<p>Let''s create a simple project to demonstrate the basic concepts of Responsive Design. Follow along with the code examples below.</p>
<h3>Conclusion</h3>
<p>Now that you have a basic understanding of Responsive Design, you can continue exploring more advanced topics and building more complex applications.</p>', '2024-09-05 22:33:55', '2024-09-12 22:33:55', 0, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (10, '10 Tips for Better Responsive Design', '<h2>Advanced Responsive Design Techniques</h2>
<p>Once you''ve mastered the basics of Responsive Design, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in Responsive Design</h3>
<p>Understanding and implementing design patterns can significantly improve your Responsive Design code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in Responsive Design applications.</p>
<h3>Integration with Other Technologies</h3>
<p>Responsive Design works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling Responsive Design Applications</h3>
<p>As your application grows, you''ll need strategies to scale your Responsive Design implementation. This section covers key scaling considerations.</p>', '2024-12-03 22:33:55', '2025-01-01 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (11, 'The Future of API Design', '<h2>API Design Best Practices</h2>
<p>Following best practices in API Design is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with API Design.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your API Design code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your API Design code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your API Design code thoroughly.</p>', '2024-07-29 22:33:55', '2024-09-05 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (12, 'The Future of Web Design', '<h2>Advanced Web Design Techniques</h2>
<p>Once you''ve mastered the basics of Web Design, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in Web Design</h3>
<p>Understanding and implementing design patterns can significantly improve your Web Design code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in Web Design applications.</p>
<h3>Integration with Other Technologies</h3>
<p>Web Design works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling Web Design Applications</h3>
<p>As your application grows, you''ll need strategies to scale your Web Design implementation. This section covers key scaling considerations.</p>', '2024-06-27 22:33:55', '2024-08-09 22:33:55', 0, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (13, 'Getting Started with CSS Styling', '<h2>CSS Styling Best Practices</h2>
<p>Following best practices in CSS Styling is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with CSS Styling.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your CSS Styling code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your CSS Styling code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your CSS Styling code thoroughly.</p>', '2024-09-05 22:33:55', '2024-11-17 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (14, 'Web Design Best Practices', '<h2>Advanced Web Design Techniques</h2>
<p>Once you''ve mastered the basics of Web Design, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in Web Design</h3>
<p>Understanding and implementing design patterns can significantly improve your Web Design code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in Web Design applications.</p>
<h3>Integration with Other Technologies</h3>
<p>Web Design works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling Web Design Applications</h3>
<p>As your application grows, you''ll need strategies to scale your Web Design implementation. This section covers key scaling considerations.</p>', '2025-03-07 22:33:55', '2025-04-22 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (15, 'Getting Started with Security Best Practices', '<h2>Advanced Security Best Practices Techniques</h2>
<p>Once you''ve mastered the basics of Security Best Practices, it''s time to explore more advanced techniques that can take your skills to the next level.</p>
<h3>Design Patterns in Security Best Practices</h3>
<p>Understanding and implementing design patterns can significantly improve your Security Best Practices code structure and maintainability.</p>
<h3>Working with Complex Data</h3>
<p>Learn how to efficiently handle and process complex data structures in Security Best Practices applications.</p>
<h3>Integration with Other Technologies</h3>
<p>Security Best Practices works well with various other technologies. This section explores some common integration scenarios.</p>
<h3>Scaling Security Best Practices Applications</h3>
<p>As your application grows, you''ll need strategies to scale your Security Best Practices implementation. This section covers key scaling considerations.</p>', '2024-08-08 22:33:55', '2025-04-20 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (16, 'Understanding Mobile Development Fundamentals', '<h2>Mobile Development Best Practices</h2>
<p>Following best practices in Mobile Development is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Mobile Development.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Mobile Development code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Mobile Development code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Mobile Development code thoroughly.</p>', '2025-01-12 22:33:55', '2025-02-08 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (17, 'Why Backend Development Matters in 2023', '<h2>Backend Development Best Practices</h2>
<p>Following best practices in Backend Development is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Backend Development.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Backend Development code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Backend Development code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Backend Development code thoroughly.</p>', '2025-05-10 22:33:55', '2025-05-26 22:33:55', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (18, 'Why Security Best Practices Matters in 2023', '<h2>Security Best Practices Best Practices</h2>
<p>Following best practices in Security Best Practices is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with Security Best Practices.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your Security Best Practices code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your Security Best Practices code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your Security Best Practices code thoroughly.</p>', '2025-01-20 22:33:55', '2025-04-23 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (19, 'CSS Styling for Beginners', '<h2>Introduction to CSS Styling</h2>
<p>CSS Styling is a powerful tool in modern web development. This article will guide you through the basics and help you get started with your first project.</p>
<h3>Why Learn CSS Styling?</h3>
<p>Learning CSS Styling can significantly enhance your development skills and open up new career opportunities. It''s widely used in the industry and has a strong community support.</p>
<h3>Setting Up Your Environment</h3>
<p>To get started with CSS Styling, you''ll need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
<h3>Your First CSS Styling Project</h3>
<p>Let''s create a simple project to demonstrate the basic concepts of CSS Styling. Follow along with the code examples below.</p>
<h3>Conclusion</h3>
<p>Now that you have a basic understanding of CSS Styling, you can continue exploring more advanced topics and building more complex applications.</p>', '2025-02-11 22:33:55', '2025-04-17 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (20, 'The Future of React Development', '<h2>React Development Best Practices</h2>
<p>Following best practices in React Development is crucial for writing maintainable and efficient code. This article outlines key practices that every developer should follow.</p>
<h3>Code Organization</h3>
<p>Properly organizing your code makes it easier to understand, maintain, and scale. Consider using a modular approach when working with React Development.</p>
<h3>Performance Optimization</h3>
<p>Performance is critical in modern applications. Learn how to optimize your React Development code for better speed and efficiency.</p>
<h3>Testing Strategies</h3>
<p>Implementing proper testing strategies ensures your React Development code works as expected and prevents regressions when making changes.</p>
<h3>Documentation</h3>
<p>Well-documented code is easier to maintain and collaborate on. Make sure to document your React Development code thoroughly.</p>', '2025-04-04 22:33:55', '2025-05-06 22:33:55', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (21, 'Getting Started with React', '<h2>Introduction to React</h2>
<p>React is a popular JavaScript library for building user interfaces. It''s declarative, efficient, and flexible.</p>

<p>In this post, we''ll explore the basics of React and how to get started with your first React application.</p>

<h3>Why React?</h3>
<p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>

<h3>Components</h3>
<p>React is all about components. You can think of components as custom HTML elements that you create. They''re reusable pieces of code that return HTML via a render function.</p>

<h3>JSX</h3>
<p>React uses JSX, which is a syntax extension to JavaScript. It looks like HTML and makes it easier to write React components.</p>

<h3>Getting Started</h3>
<p>To create a new React application, you can use Create React App:</p>

<pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>

<p>This will set up a new React project with all the necessary configurations.</p>

<blockquote>React has been a game-changer for frontend development, making it easier to build complex UIs with reusable components.</blockquote>

<h3>Key Features</h3>
<ul>
  <li><strong>Virtual DOM</strong> - React creates a lightweight representation of the real DOM in memory</li>
  <li><strong>JSX</strong> - A syntax extension that makes writing components more intuitive</li>
  <li><strong>Component-Based</strong> - Build encapsulated components that manage their own state</li>
  <li><strong>Unidirectional Data Flow</strong> - Data flows down from parent to child components</li>
</ul>', '2023-10-15 10:30:00', '2023-10-15 10:30:00', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (22, 'CSS Grid Layout: A Complete Guide', '<h2>Understanding CSS Grid</h2>
<p>CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns.</p>

<h3>Why Use CSS Grid?</h3>
<p>CSS Grid Layout allows you to create complex layouts with ease. It''s perfect for:</p>

<ul>
  <li>Overall page layouts</li>
  <li>Card layouts</li>
  <li>Form layouts</li>
  <li>Any design that requires precise placement of elements</li>
</ul>

<h3>Basic Concepts</h3>
<p>The Grid Layout consists of a parent element (Grid Container) with one or more child elements (Grid Items).</p>

<pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}</code></pre>

<p>This creates a grid with three equal-width columns and a 10px gap between items.</p>

<h3>Grid Lines</h3>
<p>Grid lines are the lines that make up the grid. They can be horizontal or vertical.</p>

<h3>Grid Tracks</h3>
<p>Grid tracks are the spaces between grid lines. They''re essentially the rows and columns of your grid.</p>

<h3>Grid Areas</h3>
<p>Grid areas are spaces surrounded by four grid lines. You can name these areas and place items within them.</p>

<h3>Responsive Design with Grid</h3>
<p>CSS Grid makes responsive design much easier. You can use media queries to change the grid layout at different screen sizes.</p>

<blockquote>CSS Grid has revolutionized web layout, making it possible to create complex designs that were previously difficult or impossible.</blockquote>

<h3>Browser Support</h3>
<p>CSS Grid is now supported in all modern browsers, making it a viable option for production websites.</p>', '2023-11-05 14:45:00', '2023-11-05 14:45:00', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (23, 'The Art of Travel Photography', '<h2>Capturing the World Through Your Lens</h2>
<p>Travel photography is about capturing the essence of a place through its landscapes, people, and culture.</p>

<h3>Equipment</h3>
<p>You don''t need expensive equipment to take great travel photos. A smartphone with a good camera can work wonders. However, if you''re serious about photography, consider:</p>

<ul>
  <li>A mirrorless or DSLR camera</li>
  <li>A versatile zoom lens</li>
  <li>A wide-angle lens for landscapes</li>
  <li>A prime lens for portraits and low light</li>
  <li>Extra batteries and memory cards</li>
</ul>

<h3>Composition Tips</h3>
<ol>
  <li><strong>Rule of Thirds</strong>: Place key elements along the lines or at the intersections of a 3x3 grid.</li>
  <li><strong>Leading Lines</strong>: Use natural lines to lead the viewer''s eye through the image.</li>
  <li><strong>Framing</strong>: Use elements in the scene to frame your subject.</li>
  <li><strong>Perspective</strong>: Change your viewpoint to create more interesting images.</li>
</ol>

<h3>Lighting</h3>
<p>The golden hours (shortly after sunrise and before sunset) provide the best natural light for photography. Soft, warm light enhances colors and creates a magical atmosphere.</p>

<h3>Telling a Story</h3>
<p>Great travel photography tells a story. Capture not just the famous landmarks, but also the small details that make a place unique.</p>

<h3>Post-Processing</h3>
<p>A little post-processing can enhance your images. Adjust exposure, contrast, and colors to make your photos pop, but try to keep them looking natural.</p>

<blockquote>Photography is the story I fail to put into words. - Destin Sparks</blockquote>', '2023-12-20 09:15:00', '2023-12-20 09:15:00', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (24, 'Healthy Eating Habits for Busy Professionals', '<h2>Balancing Nutrition and a Busy Schedule</h2>
<p>Maintaining a healthy diet can be challenging when you have a busy schedule, but it''s not impossible.</p>

<h3>Plan Your Meals</h3>
<p>Spend some time each weekend planning your meals for the week. This helps you make healthier choices and reduces the temptation to order takeout.</p>

<h3>Meal Prep</h3>
<p>Prepare meals in advance when you have time. Cook in batches and store portions in the freezer for busy days.</p>

<div class="tip-box">
  <h4>Quick Tip</h4>
  <p>Use a slow cooker or instant pot to prepare meals with minimal effort. Just add ingredients in the morning and have a delicious meal ready by evening.</p>
</div>

<h3>Smart Snacking</h3>
<p>Keep healthy snacks at your desk or in your bag. Options include:</p>
<ul>
  <li>Nuts and seeds</li>
  <li>Fresh fruit</li>
  <li>Greek yogurt</li>
  <li>Protein bars</li>
  <li>Vegetable sticks with hummus</li>
</ul>

<h3>Stay Hydrated</h3>
<p>Often, we mistake thirst for hunger. Keep a water bottle at your desk and drink regularly throughout the day.</p>

<h3>Mindful Eating</h3>
<p>Even when you''re busy, try to eat mindfully. Take a proper lunch break away from your desk, and focus on enjoying your food without distractions.</p>

<h3>Quick and Healthy Meal Ideas</h3>
<ol>
  <li><strong>Overnight oats</strong>: Prepare the night before for a quick breakfast.</li>
  <li><strong>Grain bowls</strong>: Combine cooked grains, protein, and vegetables.</li>
  <li><strong>Sheet pan meals</strong>: Roast protein and vegetables together for minimal cleanup.</li>
  <li><strong>Salad jars</strong>: Layer ingredients in a jar for a grab-and-go lunch.</li>
</ol>

<p>Remember, healthy eating isn''t about perfection. It''s about making better choices most of the time.</p>', '2024-01-10 16:20:00', '2024-01-10 16:20:00', 1, 2);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (25, 'Introduction to Meditation', '<h2>Finding Inner Peace Through Meditation</h2>
<p>Meditation is a practice that can help reduce stress, increase focus, and promote emotional health.</p>

<h3>What is Meditation?</h3>
<p>Meditation is a technique for resting the mind and attaining a state of consciousness different from the normal waking state. It involves focusing your attention and eliminating the stream of jumbled thoughts that may be crowding your mind.</p>

<h3>Benefits of Meditation</h3>
<ul>
  <li>Reduces stress and anxiety</li>
  <li>Improves focus and concentration</li>
  <li>Enhances self-awareness</li>
  <li>Promotes emotional health</li>
  <li>May reduce age-related memory loss</li>
  <li>Can generate kindness</li>
  <li>May help fight addictions</li>
</ul>

<h3>Types of Meditation</h3>
<ol>
  <li><strong>Mindfulness meditation</strong>: Focus on your breath and observe thoughts without judgment</li>
  <li><strong>Focused meditation</strong>: Concentrate on a single object, sound, or sensation</li>
  <li><strong>Loving-kindness meditation</strong>: Direct positive energy toward yourself and others</li>
  <li><strong>Body scan meditation</strong>: Focus attention on different parts of your body</li>
  <li><strong>Transcendental meditation</strong>: Silently repeat a mantra</li>
</ol>

<h3>Getting Started</h3>
<p>Begin with just a few minutes each day and gradually increase the duration. Find a quiet place, sit comfortably, and focus on your breath. When your mind wanders, gently bring your attention back to your breath.</p>

<blockquote>The goal of meditation isn''t to control your thoughts, it''s to stop letting them control you.</blockquote>

<p>Remember, meditation is a practice. It takes time to develop, so be patient with yourself.</p>', '2024-02-05 08:10:00', '2024-02-05 08:10:00', 1, 1);
INSERT INTO posts (id, title, content, created_at, updated_at, published, user_id) VALUES (27, 'this °¡demo', '<p>223w232</p>', '2025-06-04 15:11:53.882243', '2025-06-04 15:37:34.808927', 1, 1);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Data for table categories
INSERT INTO categories (id, name) VALUES (1, 'Technology');
INSERT INTO categories (id, name) VALUES (2, 'Web Development');
INSERT INTO categories (id, name) VALUES (3, 'Travel');
INSERT INTO categories (id, name) VALUES (4, 'Photography');
INSERT INTO categories (id, name) VALUES (5, 'Food');
INSERT INTO categories (id, name) VALUES (6, 'Lifestyle');
INSERT INTO categories (id, name) VALUES (7, 'Health');

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Data for table tags
INSERT INTO tags (id, name) VALUES (1, 'react');
INSERT INTO tags (id, name) VALUES (2, 'javascript');
INSERT INTO tags (id, name) VALUES (3, 'frontend');
INSERT INTO tags (id, name) VALUES (4, 'css');
INSERT INTO tags (id, name) VALUES (5, 'web design');
INSERT INTO tags (id, name) VALUES (6, 'layout');
INSERT INTO tags (id, name) VALUES (7, 'travel');
INSERT INTO tags (id, name) VALUES (8, 'photography');
INSERT INTO tags (id, name) VALUES (9, 'tips');
INSERT INTO tags (id, name) VALUES (10, 'nutrition');
INSERT INTO tags (id, name) VALUES (11, 'meal prep');
INSERT INTO tags (id, name) VALUES (12, 'healthy eating');
INSERT INTO tags (id, name) VALUES (13, 'meditation');
INSERT INTO tags (id, name) VALUES (14, 'mindfulness');
INSERT INTO tags (id, name) VALUES (15, 'wellness');
INSERT INTO tags (id, name) VALUES (16, 'sdds');
INSERT INTO tags (id, name) VALUES (17, '44');

CREATE TABLE post_categories (
    post_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Data for table post_categories
INSERT INTO post_categories (post_id, category_id) VALUES (1, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (1, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (2, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (3, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (4, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (4, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (4, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (5, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (5, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (6, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (6, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (6, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (7, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (7, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (7, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (8, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (8, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (8, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (9, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (9, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (9, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (10, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (11, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (11, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (11, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (12, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (12, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (13, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (13, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (13, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (14, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (15, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (16, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (17, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (17, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (17, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (18, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (19, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (19, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (20, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (20, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (21, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (21, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (22, 1);
INSERT INTO post_categories (post_id, category_id) VALUES (22, 2);
INSERT INTO post_categories (post_id, category_id) VALUES (23, 3);
INSERT INTO post_categories (post_id, category_id) VALUES (23, 4);
INSERT INTO post_categories (post_id, category_id) VALUES (24, 5);
INSERT INTO post_categories (post_id, category_id) VALUES (24, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (24, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (25, 7);
INSERT INTO post_categories (post_id, category_id) VALUES (25, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (27, 6);
INSERT INTO post_categories (post_id, category_id) VALUES (27, 7);

CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Data for table post_tags
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 6);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (3, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (3, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (3, 3);
INSERT INTO post_tags (post_id, tag_id) VALUES (4, 9);
INSERT INTO post_tags (post_id, tag_id) VALUES (4, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (4, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (4, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (5, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (5, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (6, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (6, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (6, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (6, 15);
INSERT INTO post_tags (post_id, tag_id) VALUES (7, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (7, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (7, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (8, 5);
INSERT INTO post_tags (post_id, tag_id) VALUES (8, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (9, 11);
INSERT INTO post_tags (post_id, tag_id) VALUES (9, 10);
INSERT INTO post_tags (post_id, tag_id) VALUES (9, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (9, 5);
INSERT INTO post_tags (post_id, tag_id) VALUES (9, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (10, 10);
INSERT INTO post_tags (post_id, tag_id) VALUES (10, 9);
INSERT INTO post_tags (post_id, tag_id) VALUES (11, 3);
INSERT INTO post_tags (post_id, tag_id) VALUES (11, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (11, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (11, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (12, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (12, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (13, 3);
INSERT INTO post_tags (post_id, tag_id) VALUES (13, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (13, 6);
INSERT INTO post_tags (post_id, tag_id) VALUES (13, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (13, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (14, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (14, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (14, 10);
INSERT INTO post_tags (post_id, tag_id) VALUES (15, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (15, 15);
INSERT INTO post_tags (post_id, tag_id) VALUES (15, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (16, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (16, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (16, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (16, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (16, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (17, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (17, 9);
INSERT INTO post_tags (post_id, tag_id) VALUES (18, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (18, 6);
INSERT INTO post_tags (post_id, tag_id) VALUES (18, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (18, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (18, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (19, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (19, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (19, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (20, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (20, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (20, 10);
INSERT INTO post_tags (post_id, tag_id) VALUES (21, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (21, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (21, 3);
INSERT INTO post_tags (post_id, tag_id) VALUES (22, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (22, 5);
INSERT INTO post_tags (post_id, tag_id) VALUES (22, 6);
INSERT INTO post_tags (post_id, tag_id) VALUES (23, 7);
INSERT INTO post_tags (post_id, tag_id) VALUES (23, 8);
INSERT INTO post_tags (post_id, tag_id) VALUES (23, 9);
INSERT INTO post_tags (post_id, tag_id) VALUES (24, 10);
INSERT INTO post_tags (post_id, tag_id) VALUES (24, 11);
INSERT INTO post_tags (post_id, tag_id) VALUES (24, 12);
INSERT INTO post_tags (post_id, tag_id) VALUES (25, 13);
INSERT INTO post_tags (post_id, tag_id) VALUES (25, 14);
INSERT INTO post_tags (post_id, tag_id) VALUES (25, 15);
INSERT INTO post_tags (post_id, tag_id) VALUES (27, 16);
INSERT INTO post_tags (post_id, tag_id) VALUES (27, 17);

