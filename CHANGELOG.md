# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contributor(s)

- [@chanhi2000][chanhi2000]: PL
- [@dhj27][dhj27]: Backend
- [@lmy9237][lmy9237]: Frontend

## [Unreleased]

<!-- ### Added
### Changed
### Fixed
### Removed -->

## [0.2.0-beta2] - 2025-02-26

### Added

- [@chanhi2000][chanhi2000]
  - `${DEVOPS}` admin 환경에 대한 관련 파일 추가 
    - `admin/.bash_profile`: 기동하는 엔진의 프로필
    - `admin/deploy-local-*.yml`: 배포에 필요한 Docker Image에 대한 환경관리  
  - `${DEVOPS}` 코드규칙 관련 lint 추가 (EditorConfig, ESLint, etc.)
  - `${BACK}`/`${DEVOPS}` Docker 이미지의 환경변수 구성 (CORS 필터 허용 address, 호스트 ssh 접근)
  - `${FRONT}`/`${BACK}` 사용자 (목록, 추가, 편집, 비밀변경, 삭제)
  - `${FRONT}`/`${BACK}` 활성 사용자 세션 (목록)
  - `${FRONT}`/`${BACK}` 인증서 (목록)
  - `${BACK}` 인증서 파일처리 / SSH처리 분리개발
- [@dhj27][dhj27]
  - `${FRONT}`/`${BACK}` Storage Domain > Template 가져오기
  - `${FRONT}`/`${BACK}` Storage Domain > VM 가져오기 목록
  - `${FRONT}`/`${BACK}` Storage Domain > VM 가져오기
  - `${FRONT}`/`${BACK}` Storage Domain > VM 불러오기 목록
  - `${FRONT}`/`${BACK}` Storage Domain > VM 불러오기
  - `${FRONT}`/`${BACK}` Storage Domain > Disk 불러오기 목록
  - `${FRONT}`/`${BACK}` Storage Domain > Disk 불러오기
  - `${FRONT}` VM 생성 시 Disk 이름 자동입력
- [@lmy9237][lmy9237]
  - `${FRONT}` 스토리지 추가페이지 생성
  - `${FRONT}` css변수 생성 (font size px단위, 모달창 크기, 등등)
  

### Changed

- [@chanhi2000][chanhi2000]
  - `${FRONT}`/`${BACK}` project nameing 변경 itcloud -> rutil-vm
  - `${FRONT}` 리펙토링 - 모듈분리 (BaseModal, PagingTableOuter, etc.)
  - `${FRONT}` 컴파일 방식 변경 (webpack -> vite)
- [@dhj27][dhj27]
  - `${FRONT}` Storage Domain 생성모달
  - `${FRONT}` Disk 생성 모달
  - `${FRONT}` aside 메뉴 드래그 기능 (진행중)
  - `${FRONT}` VM 모달 리팩토링
  - `${FRONT}` VM 생성
  - `${FRONT}` VM Disk 생성, 편집
- [@lmy9237][lmy9237]
  - `${FRONT}`: 스타일 수정 (nav 아이콘, 반응형처리)
  - `${FRONT}`: 우클릭박스 수정
  - `${FRONT}`: Path.jsx 링크이동

### Fixed

- [@chanhi2000][chanhi2000]
  - `${BACK}`: PostgreSQL 환경에서 발생하는 too many clients 처리 (`max-connection` 제한 `10` -> `4`)
  - `${BACK}`: Github Actions 연동 정상화 (사내 Synology NAS에 Docker Image 자동 업로드 처리 - 백앤드only)
  - `${BACK}`: Docker환경에서 JPA 조회 안되는 현상 처리
  - `${BACK}`: Timezone문제로 인한 통계정보 출력 불량
- [@dhj27][dhj27]
- [@lmy9237][lmy9237]
  - `${FRONT}` 호스트 > 네트워크 모달 정보 안나오는 것 수정 (진행중)
  - `${FRONT}` Template 생성 (스토리지 공간 오류)
  - `${FRONT}` Template NIC 생성오류 보정
  - `${FRONT}` Template NIC 삭제오류 보정
  - `${FRONT}` Template NIC 라디오버튼 표시안뜨는것 보정
  - `${FRONT}` vNIC Profile 생성모달 데이터센터오류 보정
  - `${FRONT}` Storage Domain 우클릭 출력불량 오류 보정

### Removed

- [@lmy9237][lmy9237]
  - `${FRONT}` 필요없는 구 컴포넌트 삭제

## 0.2.0-beta1 - 2025.02.12

### Added

프로젝트 병합 후 첫 릴리즈

[0.2.0-beta3]: https://github.com/ititcloud/rutil-vm/compare/v0.2.0-beta2...v0.2.0-beta3
[0.2.0-beta2]: https://github.com/ititcloud/rutil-vm/releases/tag/v0.2.0-beta2

[chanhi2000]: https://github.com/chanhi2000
[dhj27]: https://github.com/dhj27
[lmy9237]: https://github.com/lmy9237