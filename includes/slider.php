<div class="slider">
    <div class="slides" id="slides">
        <?php foreach ($slides as $slide): ?>
            <div class="slide">
                <img src="<?= htmlspecialchars($slide['image_url']); ?>" alt="<?= htmlspecialchars($slide['title']); ?>">
                <div class="slide-content">
                    <h2><?= htmlspecialchars($slide['title']); ?></h2>
                    <p><?= htmlspecialchars($slide['description']); ?></p>
                    <a href="<?= htmlspecialchars($slide['button_link']); ?>" class="btn">
                        <?= htmlspecialchars($slide['button_text']); ?>
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="slider-nav" id="slider-nav">
        <?php foreach ($slides as $index => $slide): ?>
            <div class="slider-dot <?= $index === 0 ? 'active' : ''; ?>"></div>
        <?php endforeach; ?>
    </div>
    <div class="slider-arrow prev" id="prev-slide">&#10094;</div>
    <div class="slider-arrow next" id="next-slide">&#10095;</div>
</div>