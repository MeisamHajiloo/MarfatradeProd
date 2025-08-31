<div class="slider">
    <div class="slides-container">
        <div class="slides" id="slides">
            <?php foreach ($slides as $index => $slide): ?>
                <div class="slide">
                    <div class="slide-bg" style="background-image: url('<?= htmlspecialchars($slide['image_url']); ?>')"></div>
                    <div class="slide-content">
                        <h2><?= htmlspecialchars($slide['title']); ?></h2>
                        <p><?= htmlspecialchars($slide['description']); ?></p>
                        <?php if (!empty($slide['button_link']) && !empty($slide['button_text'])): ?>
                            <a href="<?= htmlspecialchars($slide['button_link']); ?>" class="btn">
                                <?= htmlspecialchars($slide['button_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <?php if (count($slides) > 1): ?>
        <div class="slider-nav">
            <?php foreach ($slides as $index => $slide): ?>
                <div class="slider-dot <?= $index === 0 ? 'active' : ''; ?>"></div>
            <?php endforeach; ?>
        </div>

        <button class="slider-arrow prev" id="prev-slide">&#10094;</button>
        <button class="slider-arrow next" id="next-slide">&#10095;</button>
    <?php endif; ?>
</div>