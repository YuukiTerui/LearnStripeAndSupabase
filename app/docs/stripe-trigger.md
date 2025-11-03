Trigger specific webhook events to be sent. Webhooks events created through
the trigger command will also create all necessary side-effect events that are
needed to create the triggered event as well as the corresponding API objects.

Supported events:
  account.application.deauthorized
  account.updated
  balance.available
  billing_portal.configuration.created
  billing_portal.configuration.updated
  billing_portal.session.created
  cash_balance.funds_available
  charge.captured
  charge.dispute.closed
  charge.dispute.created
  charge.dispute.updated
  charge.failed
  charge.refund.updated
  charge.refunded
  charge.succeeded
  checkout.session.async_payment_failed
  checkout.session.async_payment_succeeded
  checkout.session.completed
  checkout.session.expired
  coupon.created
  coupon.deleted
  coupon.updated
  credit_note.created
  credit_note.updated
  credit_note.voided
  customer.created
  customer.deleted
  customer.discount.created
  customer.discount.deleted
  customer.discount.updated
  customer.source.created
  customer.source.updated
  customer.subscription.created
  customer.subscription.deleted
  customer.subscription.paused
  customer.subscription.trial_will_end
  customer.subscription.updated
  customer.updated
  customer_cash_balance_transaction.created
  identity.verification_session.canceled
  identity.verification_session.created
  identity.verification_session.redacted
  invoice.created
  invoice.deleted
  invoice.finalized
  invoice.marked_uncollectible
  invoice.paid
  invoice.payment_action_required
  invoice.payment_failed
  invoice.payment_succeeded
  invoice.sent
  invoice.updated
  invoice.voided
  invoiceitem.created
  invoiceitem.deleted
  issuing_authorization.request
  issuing_authorization.request.eu
  issuing_authorization.request.gb
  issuing_card.created
  issuing_card.created.eu
  issuing_card.created.gb
  issuing_cardholder.created
  issuing_cardholder.created.eu
  issuing_cardholder.created.gb
  payment_intent.amount_capturable_updated
  payment_intent.canceled
  payment_intent.created
  payment_intent.partially_funded
  payment_intent.payment_failed
  payment_intent.processing
  payment_intent.requires_action
  payment_intent.succeeded
  payment_link.created
  payment_link.updated
  payment_method.attached
  payment_method.detached
  payment_method.updated
  payout.created
  payout.updated
  plan.created
  plan.deleted
  plan.updated
  price.created
  price.updated
  product.created
  product.deleted
  product.updated
  promotion_code.created
  promotion_code.updated
  quote.accepted
  quote.canceled
  quote.created
  quote.finalized
  reporting.report_run.succeeded
  setup_intent.canceled
  setup_intent.created
  setup_intent.requires_action
  setup_intent.setup_failed
  setup_intent.succeeded
  subscription.payment_failed
  subscription.payment_succeeded
  subscription_schedule.canceled
  subscription_schedule.created
  subscription_schedule.released
  subscription_schedule.updated
  tax_rate.created
  tax_rate.updated
  transfer.created
  transfer.reversed
  transfer.updated
  v1.billing.meter.error_report_triggered
  v1.billing.meter.no_meter_found

Usage:
  stripe trigger <event> [flags]

Examples:
  stripe trigger payment_intent.created

Flags:
      --add stringArray         Add params to the trigger
      --api-version string      Specify API version for trigger
      --edit                    Edit the trigger directly in your default IDE
  -h, --help                    help for trigger
      --override stringArray    Override params in the trigger
      --raw string              Raw fixture in string format to replace all default fixtures
      --remove stringArray      Remove params from the trigger
      --skip stringArray        Skip specific steps in the trigger
      --stripe-account string   Set a header identifying the connected account

Global flags:
      --api-key string        Your API key to use for the command
      --color string          turn on/off color output (on, off, auto)
      --config string         config file (default is $HOME/.config/stripe/config.toml)
      --device-name string    device name
      --log-level string      log level (debug, info, trace, warn, error) (default "info")
  -p, --project-name string   the project name to read from for config (default "default")
