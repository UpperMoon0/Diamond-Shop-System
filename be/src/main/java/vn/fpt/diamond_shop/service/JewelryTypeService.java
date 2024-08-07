package vn.fpt.diamond_shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.diamond_shop.model.dto.SaveJewelryTypeRequest;
import vn.fpt.diamond_shop.model.entity.JewelryType;
import vn.fpt.diamond_shop.repository.IJewelryTypeRepository;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class JewelryTypeService implements IJewelryTypeService {
    private final IJewelryTypeRepository jewelryTypeRepository;

    @Override
    public List<JewelryType> findAll() {
        return jewelryTypeRepository.findAll();
    }

    @Override
    public void save(SaveJewelryTypeRequest request) {
        JewelryType jewelryType;
        if (request.getId() == 0) {
            jewelryType = new JewelryType();
        } else {
            jewelryType = jewelryTypeRepository.findById(request.getId()).orElse(null);
            if (jewelryType == null) {
                throw new RuntimeException("Jewelry type not found");
            }
        }

        jewelryType.setType(request.getType());
        try {
            jewelryTypeRepository.save(jewelryType);
        } catch (Exception e) {
            throw new RuntimeException("Jewelry type already exists");
        }
    }

    @Override
    public void toggleStatus(Long id) {
        JewelryType jewelryType = jewelryTypeRepository.findById(id).orElse(null);
        if (jewelryType == null) {
            throw new IllegalArgumentException("Jewelry type not found");
        }

        if ("ACTIVE".equals(jewelryType.getStatus())) {
            jewelryType.setStatus("INACTIVE");
        } else {
            jewelryType.setStatus("ACTIVE");
        }

        jewelryTypeRepository.save(jewelryType);
    }
}
