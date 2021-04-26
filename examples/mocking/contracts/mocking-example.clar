;; (define-constant price-oracle 'SP000000000000000000002Q6VF78.imaginary-oracle-1)
(define-constant error-sold-out (err u1))
(define-constant base-usd-price u100)

(define-data-var tickets-available uint u0)

(define-private (stx-price)
	(contract-call? 'SP000000000000000000002Q6VF78.imaginary-oracle-v1 price "usd" "stx" base-usd-price)
	)

(define-public (ticket-price)
	(begin
		(asserts! (> (var-get tickets-available) u0) error-sold-out)
		(ok (* (var-get tickets-available) (stx-price)))
		)
	)