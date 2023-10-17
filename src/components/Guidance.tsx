import {
  Button,
  Highlight,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from "@chakra-ui/react";

interface GuidanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Guidance({ isOpen, onClose }: GuidanceProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>안내 사항</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList>
            <ListItem>
              <Highlight
                query="기능 확인 목적"
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "red.200" }}
              >
                현재 사이트는 기능 확인 목적의 데모 사이트입니다.
              </Highlight>
            </ListItem>
            <ListItem>
              <Highlight
                query="경기도"
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "red.200" }}
              >
                현재 경기도에 있는 아파트만 등록되어 있습니다.
              </Highlight>
            </ListItem>
            <ListItem>
              <Highlight
                query="완전하지 않습니다"
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "red.200" }}
              >
                현재 사이트는 개발 진행 중인 사이트라 기능적으로 완전하지
                않습니다.
              </Highlight>
            </ListItem>
            <ListItem>
              <Highlight
                query="초록색 하트"
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "teal" }}
              >
                아파트는 검색 결과 오른쪽 상단에 초록색 하트를 누르면 본인
                아파트로 등록 가능합니다.
              </Highlight>
            </ListItem>
            <ListItem>
              <Highlight
                query={["피드(포스트)", "공지사항", "투표"]}
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "red.200" }}
              >
                현재는 피드(포스트), 공지사항, 투표 기능 작동 여부만 일부 확인
                가능합니다.
              </Highlight>
            </ListItem>
            <ListItem>
              <Highlight
                query="용인신갈푸르지오"
                styles={{ px: "2", py: "0.5", rounded: "full", bg: "red.200" }}
              >
                "용인신갈푸르지오"를 검색하셔서 아파트로 등록하시면 데이터가
                있는 모습을 확인할 수 있습니다.
              </Highlight>
            </ListItem>
          </UnorderedList>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
