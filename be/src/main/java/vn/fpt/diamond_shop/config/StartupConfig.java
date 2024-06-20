package vn.fpt.diamond_shop.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.fpt.diamond_shop.constant.*;
import vn.fpt.diamond_shop.model.entity.*;
import vn.fpt.diamond_shop.repository.*;

import java.security.AuthProvider;
import java.time.LocalDateTime;

@Configuration
public class StartupConfig {
    @Bean
    public CommandLineRunner initTables(ICutRepository cutRepository,
                                        IColorRepository colorRepository,
                                        IPolishRepository polishRepository,
                                        IShapeRepository shapeRepository,
                                        IClarityRepository clarityRepository,
                                        IJewelryTagRepository jewelryTagRepository) {
        return args -> {
            for (ECut cutValue : ECut.values()) {
                Cut cut = cutRepository.findByCut(cutValue);
                if (cut == null) {
                    cut = new Cut();
                    cut.setCut(cutValue);
                    cut.setCreateAt(LocalDateTime.now());
                    cutRepository.save(cut);
                }
            }

            for (EColor colorValue : EColor.values()) {
                Color color = colorRepository.findByColor(colorValue);
                if (color == null) {
                    color = new Color();
                    color.setColor(colorValue);
                    color.setCreateAt(LocalDateTime.now());
                    colorRepository.save(color);
                }
            }

            for (EPolish polishValue : EPolish.values()) {
                Polish polish = polishRepository.findByPolish(polishValue);
                if (polish == null) {
                    polish = new Polish();
                    polish.setPolish(polishValue);
                    polish.setCreateAt(LocalDateTime.now());
                    polishRepository.save(polish);
                }
            }

            for (EShape shapeValue : EShape.values()) {
                Shape shape = shapeRepository.findByShape(shapeValue);
                if (shape == null) {
                    shape = new Shape();
                    shape.setShape(shapeValue);
                    shape.setCreateAt(LocalDateTime.now());
                    shapeRepository.save(shape);
                }
            }

            for (EClarity clarityValue : EClarity.values()) {
                Clarity clarity = clarityRepository.findByClarity(clarityValue);
                if (clarity == null) {
                    clarity = new Clarity();
                    clarity.setClarity(clarityValue);
                    clarity.setCreateAt(LocalDateTime.now());
                    clarityRepository.save(clarity);
                }
            }

            for (EJewelryTag jewelryTagValue : EJewelryTag.values()) {
                JewelryTag jewelryTag = jewelryTagRepository.findByTag(jewelryTagValue);
                if (jewelryTag == null) {
                    jewelryTag = new JewelryTag();
                    jewelryTag.setTag(jewelryTagValue);
                    jewelryTag.setCreateAt(LocalDateTime.now());
                    jewelryTagRepository.save(jewelryTag);
                }
            }
        };
    }
}