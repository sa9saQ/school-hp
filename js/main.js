/**
 * ○○学園 - メインJavaScript
 * ハンバーガーメニュー、スムーズスクロール、フォーム処理など
 */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // ハンバーガーメニュー
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // メニューリンクをクリックしたらメニューを閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // メニュー外をクリックしたらメニューを閉じる
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }

  // ==========================================
  // ヘッダースクロール効果
  // ==========================================
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
      }
    });
  }

  // ==========================================
  // スムーズスクロール
  // ==========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // フォーム処理
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // フォームのバリデーション
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#D35400';
        } else {
          field.style.borderColor = '#ddd';
        }
      });

      // メールアドレスの形式チェック
      const emailField = document.getElementById('email');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#D35400';
        }
      }

      if (isValid) {
        // 送信成功メッセージ（実際の実装ではサーバーに送信）
        alert('お問い合わせを受け付けました。\n内容を確認の上、担当者よりご連絡いたします。');
        contactForm.reset();
      } else {
        alert('入力内容に不備があります。\n必須項目をご確認ください。');
      }
    });

    // 入力時にボーダー色をリセット
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        this.style.borderColor = '#D35400';
      });
      input.addEventListener('blur', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#ddd';
        }
      });
    });
  }

  // ==========================================
  // スクロールアニメーション（フェードイン）
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象の要素
  const animateElements = document.querySelectorAll(
    '.service-card, .news-item, .about-content, .message-content, .info-table'
  );

  animateElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
  });

  // ==========================================
  // 現在のページをナビゲーションでハイライト
  // ==========================================
  const currentPath = window.location.pathname;
  const navListLinks = document.querySelectorAll('.nav-list a');

  navListLinks.forEach(function(link) {
    const linkPath = link.getAttribute('href');

    if (currentPath.endsWith(linkPath) ||
        (currentPath.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ==========================================
  // 郵便番号から住所自動入力（オプション機能）
  // ==========================================
  const postalCodeInput = document.getElementById('postal-code');
  const addressInput = document.getElementById('address');

  if (postalCodeInput && addressInput) {
    postalCodeInput.addEventListener('blur', function() {
      const postalCode = this.value.replace(/-/g, '');

      if (postalCode.length === 7) {
        // 実際の実装では郵便番号APIを使用
        // ここではデモのため何もしない
        console.log('郵便番号検索: ' + postalCode);
      }
    });
  }

  // ==========================================
  // ページトップへ戻るボタン（オプション）
  // ==========================================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '&#x2191;';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #D35400;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(211, 84, 0, 0.3);
  `;

  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });

  // ホバー効果
  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#A04000';
    this.style.transform = 'translateY(-3px)';
  });

  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#D35400';
    this.style.transform = 'translateY(0)';
  });

});
